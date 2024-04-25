import {atom} from 'jotai';
import stringsEn from '../assets/language-strings/en.json'
import stringsGe from '../assets/language-strings/ge.json'
const texts = {
    en: stringsEn,
    ge: stringsGe
}

export const textsAtom = atom(texts[localStorage.language || "ge"])

export const languageAtom = atom(localStorage.language || "ge")

export const openedCategoriesAtom = atom([])

export const currentCategoryAtom = atom({})

export const addCategoryModalAtom = atom(false)

export const editCategoryModalAtom = atom(false)

export const deleteCategoryModalAtom = atom(false)

export const currentProductAtom = atom({})

export const addProductModalAtom = atom(false)

export const editProductModalAtom = atom(false)

export const deleteProductModalAtom = atom(false)

export const loaderAtom = atom(false)

export const categoriesAtom = atom([])

export const unitsAtom = atom([1, 2])