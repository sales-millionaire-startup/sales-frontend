import {atom} from 'jotai';
import stringsEn from '../assets/language-strings/en.json'
import stringsGe from '../assets/language-strings/ge.json'
const texts = {
    en: stringsEn,
    ge: stringsGe
}

export const textsAtom = atom(texts[localStorage.language || "en"])

export const languageAtom = atom(localStorage.language || "en")

export const openedCategoriesAtom = atom([])

export const categoriesAtom = atom({
    "Category": [
      {
        "id": 1,
        "name": "Electronics",
        "parentCategoryId": null,
        "createdAt": "2024-04-16T12:00:00Z",
        "updatedAt": "2024-04-16T12:00:00Z",
        "childCategories": [
          {
            "id": 2,
            "name": "Computers",
            "parentCategoryId": 1,
            "createdAt": "2024-04-16T12:00:00Z",
            "updatedAt": "2024-04-16T12:00:00Z",
            "childCategories": [
              {
                "id": 4,
                "name": "Laptops",
                "parentCategoryId": 2,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z",
                "childCategories": [],
                "products": [
                  {
                    "id": 1,
                    "name": "Dell XPS 13",
                    "description": "Ultra-thin and light laptop",
                    "price": 1299.99,
                    "createdAt": "2024-04-16T12:00:00Z",
                    "updatedAt": "2024-04-16T12:00:00Z"
                  },
                  {
                    "id": 2,
                    "name": "MacBook Pro",
                    "description": "Powerful laptop for professionals",
                    "price": 1999.99,
                    "createdAt": "2024-04-16T12:00:00Z",
                    "updatedAt": "2024-04-16T12:00:00Z"
                  }
                ]
              },
              {
                "id": 5,
                "name": "Desktops",
                "parentCategoryId": 2,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z",
                "childCategories": [],
                "products": [
                  {
                    "id": 3,
                    "name": "HP Pavilion",
                    "description": "All-in-one desktop computer",
                    "price": 899.99,
                    "createdAt": "2024-04-16T12:00:00Z",
                    "updatedAt": "2024-04-16T12:00:00Z"
                  }
                ]
              }
            ],
            "products": []
          },
          {
            "id": 3,
            "name": "Smartphones",
            "parentCategoryId": 1,
            "createdAt": "2024-04-16T12:00:00Z",
            "updatedAt": "2024-04-16T12:00:00Z",
            "childCategories": [],
            "products": [
              {
                "id": 4,
                "name": "iPhone 13",
                "description": "Latest iPhone with A15 Bionic chip",
                "price": 999.99,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z"
              },
              {
                "id": 5,
                "name": "Samsung Galaxy S22",
                "description": "Flagship Android smartphone",
                "price": 1099.99,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z"
              }
            ]
          }
        ],
        "products": []
      },
      {
        "id": 6,
        "name": "Clothing",
        "parentCategoryId": null,
        "createdAt": "2024-04-16T12:00:00Z",
        "updatedAt": "2024-04-16T12:00:00Z",
        "childCategories": [
          {
            "id": 7,
            "name": "Men's Clothing",
            "parentCategoryId": 6,
            "createdAt": "2024-04-16T12:00:00Z",
            "updatedAt": "2024-04-16T12:00:00Z",
            "childCategories": [],
            "products": [
              {
                "id": 6,
                "name": "Levi's Jeans",
                "description": "Classic denim jeans for men",
                "price": 59.99,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z"
              },
              {
                "id": 7,
                "name": "Nike T-shirt",
                "description": "Sporty t-shirt for men",
                "price": 29.99,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z"
              }
            ]
          },
          {
            "id": 8,
            "name": "Women's Clothing",
            "parentCategoryId": 6,
            "createdAt": "2024-04-16T12:00:00Z",
            "updatedAt": "2024-04-16T12:00:00Z",
            "childCategories": [],
            "products": [
              {
                "id": 8,
                "name": "Summer Dress",
                "description": "Light and airy dress for women",
                "price": 39.99,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z"
              },
              {
                "id": 9,
                "name": "High Heels",
                "description": "Elegant high heels for women",
                "price": 49.99,
                "createdAt": "2024-04-16T12:00:00Z",
                "updatedAt": "2024-04-16T12:00:00Z"
              }
            ]
          }
        ],
        "products": []
      }
    ]
  })