import { useEffect } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { groupTable, userGroupAssociationTable, userTable } from '../../state/tableState'
import { useClient } from '../../hook/clientHook/clientHook'

let dataLoadStarted = atom({
   key: 'dataLoadStarted',
   default: false,
})

/**
 * DataManager
 *
 * Loads data if not yet loaded
 */
export let DataManager = () => {
   let [done, setDone] = useRecoilState(dataLoadStarted)

   let setUserTable = useSetRecoilState(userTable)
   let setGroupTable = useSetRecoilState(groupTable)
   let setUserGroupAssociationTable = useSetRecoilState(userGroupAssociationTable)

   let client = useClient()

   let effect = () => {}
   if (!done) {
      effect = () => {
         client.getUserList().then((value) => {
            setUserTable({
               state: 'hasValue',
               value,
            })
         })

         client.getGroupList().then((value) => {
            setGroupTable({
               state: 'hasValue',
               value,
            })
         })

         client.getUserGroupAssociationList().then((value) => {
            setUserGroupAssociationTable({
               state: 'hasValue',
               value,
            })
         })

         setDone(true)
      }
   }

   useEffect(effect, [])

   return null
}
