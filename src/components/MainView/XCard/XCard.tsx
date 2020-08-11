import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   createStyles,
   makeStyles,
} from '@material-ui/core'
import DragIndicator from '@material-ui/icons/DragIndicator'
import LinkOff from '@material-ui/icons/LinkOff'
import * as React from 'react'
import { useSetRecoilState } from 'recoil'
import { createApiClient } from '../../../apiClient/apiClient'
import { Group, User } from '../../../model/model'
import { GroupId, UserId } from '../../../model/typeAlias'
import { selectedGroup, selectedUser } from '../../../state/positionalState'

let useStyle = makeStyles((theme) =>
   createStyles({
      card: {
         margin: '10px 20px',
      },
   }),
)

export interface UserCardProp {
   target: User
   unlinkTarget?: Group
}

export interface GroupCardProp {
   target: Group
   unlinkTarget?: User
}

export type XCardProp = (UserCardProp & { kind: 'user' }) | (GroupCardProp & { kind: 'group' })

export let XCard = (prop: XCardProp) => {
   let styleClass = useStyle()
   let userOrGroup = prop.kind === 'user'
   let setSelectedThing = useSetRecoilState((userOrGroup ? selectedUser : selectedGroup) as any)

   //
   let u = prop.target as User
   let g = prop.target as Group
   let name = userOrGroup ? `${u.first} ${u.last}` : g.name

   let dragIndicator = userOrGroup ? <DragIndicator /> : null

   let unlinkButton = prop.unlinkTarget ? (
      <Button
         size="small"
         onClick={() => {
            let client = createApiClient()

            let [userId, groupId] = userOrGroup
               ? [prop.target.id, prop.unlinkTarget!.id]
               : [prop.unlinkTarget!.id, prop.target.id]

            client.removeUserFromGroup(userId, groupId)
         }}
      >
         <LinkOff />
      </Button>
   ) : null

   return (
      <Card className={styleClass.card}>
         <CardContent>
            {name}
            <Box alignContent="right">{dragIndicator}</Box>
         </CardContent>
         <CardActions>
            <Button
               size="small"
               onClick={() => {
                  setSelectedThing(prop.target)
               }}
            >
               View
            </Button>
            {unlinkButton}
         </CardActions>
      </Card>
   )
}
