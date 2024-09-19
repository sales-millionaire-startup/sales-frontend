import {atom} from 'jotai';
import stringsEn from '../assets/language-strings/en.json'
import stringsGe from '../assets/language-strings/ge.json'
const texts = {
    en: stringsEn,
    ge: stringsGe
}

export const textsAtom = atom(texts[localStorage.language || "ge"])

export const languageAtom = atom(localStorage.language || "ge")

export const userAtom = atom({})

//category atoms

export const categoriesAtom = atom([])

export const openedCategoriesAtom = atom([])

export const currentCategoryAtom = atom({})

export const addCategoryModalAtom = atom(false)

export const editCategoryModalAtom = atom(false)

export const deleteCategoryModalAtom = atom(false)

//product atoms

export const currentProductAtom = atom({})

export const addProductModalAtom = atom(false)

export const editProductModalAtom = atom(false)

export const deleteProductModalAtom = atom(false)

//unit atoms

export const unitsAtom = atom([1, 2])

export const currentUnitAtom = atom({})

export const addUnitModalAtom = atom(false)

export const editUnitModalAtom = atom(false)

export const deleteUnitModalAtom = atom(false)

//global loader atom

export const loaderAtom = atom(false)

export const cartAtom = atom([])