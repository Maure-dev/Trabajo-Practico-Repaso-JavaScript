import fs from 'fs'

const apiUrl = 'https://thronesapi.com/api/v2/Characters'

async function getCharacterByName(name) {
  const response = await fetch(apiUrl)
  const characters = await response.json()
  return characters.find(char => char.fullName === name)
}

async function getAllCharacters() {
  const response = await fetch(apiUrl)
  const characters = await response.json()
  return characters
}

async function saveCharactersToFile(characters) {
  fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2), 'utf-8')
}

function readCharacters() {
  const data = fs.readFileSync('characters.json', 'utf-8')
  const characters = JSON.parse(data)
  return characters
}

function manipulateCharacters() {
  const characters = readCharacters()

  const starkCharacters = characters.filter(char => char.family === "House Stark")
  console.log('Personajes de la familia Stark:', starkCharacters)


  const newCharacter = {
    id: characters.length + 1,
    firstName: 'Juan',
    lastName: 'Perez',
    fullName: 'Juan Perez',
    family: 'Desconocida',
    title: 'Programador',
    imageUrl: 'https://i.ibb.co/vxC5xs0/klipartz-com.png'
  }
  characters.push(newCharacter)
  fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2), 'utf-8')
  console.log('Nuevo personaje agregado y archivo sobrescrito.', newCharacter)


  const filteredCharacters = characters.filter(char => char.id <= 25)
  fs.writeFileSync('characters.json', JSON.stringify(filteredCharacters, null, 2), 'utf-8')
  console.log('Personajes con ID > 25 eliminados y archivo sobrescrito.')
}

async function main() {
  // 1. Recuperar información del personaje "Ned Stark"
  const character = await getCharacterByName("Ned Stark")
  console.log(character)

  // 2. Recuperar información de todos los personajes
  const characters = await getAllCharacters()
  console.log(characters)

  // 3. Persistir el resultado de la segunda consulta en un archivo JSON
  await saveCharactersToFile(characters)

  // 4. Leer el archivo local de personajes
  manipulateCharacters()
  console.log(readCharacters())
}

main()
