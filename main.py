from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Permitindo receber post e get de todas as fontes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Configurações do MongoDB
MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb+srv://alucardeletronico:supernatural@clusterfatec.3p8m5kg.mongodb.net/?retryWrites=true&w=majority")
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.get_database("Spotify")  # Nome do seu banco de dados
likes_collection = database.get_collection("sistemaLikes")  # Nome da coleção de likes
usuarios_collection = database.get_collection("usuarios")  # Nome da coleção de usuários

class User(BaseModel):
    usuario: str
    nome: str
    email: str
    senha: str
    imagem: str
    likes: Optional[List[str]] = []  # Lista de IDs de álbuns que o usuário curtiu
    deslikes: Optional[List[str]] = []  # Lista de IDs de álbuns que o usuário não curtiu

class Album(BaseModel):
    album_id: str
    likes: int
    deslikes: int 

class id_Likes(BaseModel):
    album_id: str

class AlbumResponse(BaseModel):
    album_id: str
    likes: int
    deslikes: int

@app.post("/users/")
async def create_user(user: User):
    user_dict = user.dict()
    await usuarios_collection.insert_one(user_dict)
    return user_dict

@app.get("/users/{user_id}", response_model=User)
async def read_user(user_id: str):
    user = await usuarios_collection.find_one({"usuario": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Para que o Pydantic possa serializar o ID, convertê-lo em string
    user["id"] = str(user["_id"])  # Adiciona o ID como um campo acessível
    return user

@app.get("/album/{album_id}", response_model=AlbumResponse)
async def read_album(album_id: str):
    album = await likes_collection.find_one({"album_id": album_id})
    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    
    # Converte o ID para string para facilitar a serialização
    album["id"] = str(album["_id"])
    return album

@app.put("/users/{user_id}/likes")
async def add_likes(user_id: str, like_data: id_Likes):
    # Verifica se o usuário existe
    user = await usuarios_collection.find_one({"usuario": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Adiciona o álbum à lista de likes do usuário, se ainda não estiver lá
    await usuarios_collection.update_one(
        {"usuario": user_id},
        {"$addToSet": {"likes": like_data.album_id}}
    )

    # Verifica se o álbum já existe na coleção de álbuns
    album = await likes_collection.find_one({"album_id": like_data.album_id})
    if album:
        # Incrementa o campo 'likes' do álbum
        await likes_collection.update_one(
            {"album_id": like_data.album_id},
            {"$inc": {"likes": 1}}
        )
    else:
        # Se o álbum não existir, cria o documento com 'likes' iniciado em 1
        await likes_collection.insert_one({
            "album_id": like_data.album_id,
            "likes": 1
        })

    # Retorna o usuário atualizado
    updated_user = await usuarios_collection.find_one({"usuario": user_id})
    return updated_user

@app.patch("/users/{user_id}/deslikes")
async def add_deslikes(user_id: str, like_data: id_Likes):
    # Verifica se o usuário existe
    user = await usuarios_collection.find_one({"usuario": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Adiciona o álbum à lista de likes do usuário, se ainda não estiver lá
    await usuarios_collection.update_one(
        {"usuario": user_id},
        {"$addToSet": {"deslikes": like_data.album_id}}
    )

    # Verifica se o álbum já existe na coleção de álbuns
    album = await likes_collection.find_one({"album_id": like_data.album_id})
    if album:
        # Incrementa o campo 'deslikes' do álbum
        await likes_collection.update_one(
            {"album_id": like_data.album_id},
            {"$inc": {"deslikes": 1}}
        )
    else:
        # Se o álbum não existir, cria o documento com 'deslikes' iniciado em 1
        await likes_collection.insert_one({
            "album_id": like_data.album_id,
            "deslikes": 1
        })

    # Retorna o usuário atualizado
    updated_user = await usuarios_collection.find_one({"usuario": user_id})
    return updated_user

@app.delete("/removelike/{user_id}/{album_id}")
async def remove_like(user_id: str, album_id: str):
    # Verifica se o usuário existe
    user = await usuarios_collection.find_one({"usuario": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove o album_id da lista de likes do usuário, se ele estiver presente
    await usuarios_collection.update_one(
        {"usuario": user_id},
        {"$pull": {"likes": album_id}}
    )

    # Verifica se o álbum existe na coleção de álbuns
    album = await likes_collection.find_one({"album_id": album_id})
    if album and album["likes"] > 0:
        # Decrementa o campo 'likes' do álbum, garantindo que o valor não fique negativo
        await likes_collection.update_one(
            {"album_id": album_id},
            {"$inc": {"likes": -1}}
        )

    # Retorna o usuário atualizado
    updated_user = await usuarios_collection.find_one({"usuario": user_id})
    return updated_user

@app.delete("/removedeslike/{user_id}/{album_id}")
async def remove_deslike(user_id: str, album_id: str):
    # Verifica se o usuário existe
    user = await usuarios_collection.find_one({"usuario": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove o album_id da lista de likes do usuário, se ele estiver presente
    await usuarios_collection.update_one(
        {"usuario": user_id},
        {"$pull": {"deslikes": album_id}}
    )

    # Verifica se o álbum existe na coleção de álbuns
    album = await likes_collection.find_one({"album_id": album_id})
    if album and album["deslikes"] > 0:
        # Decrementa o campo 'likes' do álbum, garantindo que o valor não fique negativo
        await likes_collection.update_one(
            {"album_id": album_id},
            {"$inc": {"deslikes": -1}}
        )

    # Retorna o usuário atualizado
    updated_user = await usuarios_collection.find_one({"usuario": user_id})
    return updated_user