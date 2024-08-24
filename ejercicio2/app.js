const apiUrl = 'https://fakestoreapi.com/products'

async function getAllProducts() {
  try {
    const response = await fetch(apiUrl)
    const products = await response.json()
    console.log('Todos los productos:', products)
    return products
  } catch (error) {
    console.error('Error al recuperar todos los productos:', error)
  }
}

async function getLimitedProducts(limit) {
  try {
    const response = await fetch(`${apiUrl}?limit=${limit}`)
    const products = await response.json()
    console.log(`Primeros ${limit} productos:`, products)
    return products
  } catch (error) {
    console.error('Error al recuperar productos limitados:', error)
  }
}

async function addProduct(newProduct) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
    const product = await response.json()
    console.log('Producto agregado:', product)
    return product
  } catch (error) {
    console.error('Error al agregar producto:', error)
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`)
    const product = await response.json()
    console.log(`Producto con ID ${id}:`, product)
    return product
  } catch (error) {
    console.error(`Error al recuperar el producto con ID ${id}:`, error)
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    console.log(`Producto con ID ${id} eliminado:`, result)
    return result
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error)
  }
}

async function main() {
  // 1. Recuperar todos los productos
  await getAllProducts()

  // 2. Recuperar un número limitado de productos
  await getLimitedProducts(3)

  // 3. Agregar un nuevo producto
  const newProduct = {
    title: 'Monitor Samsung 24"',
    price: 149000.99,
    description: 'Monitor Full HD',
    image: 'https://http2.mlstatic.com/D_NQ_NP_843829-MLU72646996287_112023-O.webp',
    category: 'electronics'
  }
  await addProduct(newProduct)

  // 4. Recuperar producto por ID
  await getProductById(1)

  // 5. Eliminar un producto
  await deleteProduct(1)
}

main()