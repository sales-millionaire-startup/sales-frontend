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

export const currentCategoryAtom = atom({})

export const addCategoryModalAtom = atom(false)

export const editCategoryModalAtom = atom(false)

export const deleteCategoryModalAtom = atom(false)

export const loaderAtom = atom(false)

export const categoriesAtom = atom([])