#!/usr/bin/env node
import { defineStore } from 'pinia'
import { Site } from '@/utils/site'
import { Coordinate } from '@/utils/coordinate'

export const useSiteStore = defineStore('SiteStore', {
  state: () => {
    return {
      sites: [] as Site[],
      begin: null as Date|null,
      end: null as Date|null,
    }
  },
  getters: {
    one: (state) => {
      return (index: number) => {
        if(state.sites.length-1 < index){
          throw Error('index out of bounds.')
        }
        return state.sites[index]
      }
    },
    all: (state) => {
      return state.sites
    },
    timeline: (state): Date[] => {
      let tl = [] as Date[]

      if(state.begin == null || state.end == null) {
        return tl
      }

      tl.push(state.begin)
      while(tl[tl.length -1] < state.end){
        tl.push(new Date(tl[tl.length -1].getTime() + (1*60*60*1000) ))
      }
      return tl
    }
  },
  actions: {
    push(site: Site): void {
      this.sites.push(site)
      this._calcTime()
    },
    remove(index: number): void {
      if(this.sites.length <= index){
        throw Error('index out of bounds')
      }
      this.sites.splice(index, 1)
      this._calcTime()
    },
    removeByLatLng(c: Coordinate): void {
      this.sites = this.sites.filter((site) => site.coordinate === null || (site.coordinate.lat != c.lat && site.coordinate?.lng != c.lng) )
      this._calcTime()
    },
    clear(): void {
      this.sites = [] as Site[]
      this.begin = null
      this.end = null
    },
    _calcTime():void {
      this.begin = null
      this.end = null
      this.sites.forEach(site => {
        // change begin
        if(this.begin == null){
          this.begin = site.timeBegin
        } else {
          if(site.timeBegin != null && this.begin < site.timeBegin){
            this.begin = site.timeBegin
          }
        }
        // change end
        if(this.end == null){
          this.end = site.timeEnd
        } else {
          if(site.timeEnd != null && this.end < site.timeEnd){
            this.begin = site.timeEnd
          }
        }
      })
    },
  },
})