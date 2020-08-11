import * as React from 'react'
import { Group, User } from '../../../model/model'
import { XCard, XCardProp } from '../XCard/XCard'

export interface UserViewProp {
   thingList: User[]
   unlinkTarget?: Group
}

export interface GroupViewProp {
   thingList: Group[]
   unlinkTarget?: User
}

export type CardViewProp = (UserViewProp & { kind: 'user' }) | (GroupViewProp & { kind: 'group' })

export let CardView = (prop: CardViewProp) => {
   return (
      <>
         {(prop.thingList as (User | Group)[]).map((target) => (
            <XCard
               key={target.id}
               {...({
                  kind: prop.kind,
                  target: target,
                  unlinkTarget: prop.unlinkTarget,
               } as XCardProp)}
            />
         ))}
      </>
   )
}
