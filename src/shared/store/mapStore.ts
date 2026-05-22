import { create } from 'zustand'

export const useMapStore = create(set => ({
  selectedObject: null,

  setSelectedObject: object =>
    set({
      selectedObject: object,
    }),
}))