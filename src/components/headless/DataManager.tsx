import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { userTable, userGroupAssociationTable, groupTable } from '../../state/tableState'
import { createApiClient } from '../../apiClient/apiClient'

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

   let effect = () => {}
   if (!done) {
      effect = () => {
         let client = createApiClient()

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
