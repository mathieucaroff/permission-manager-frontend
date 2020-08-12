import { createStyles, makeStyles, Theme } from '@material-ui/core'

export let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      mainView: {
         '& > *': {
            display: 'inline table',
            width: '50%',
            minWidth: 'unset',
            maxWidth: 'unset',
         },
      },
      xview: {
         display: 'block',
         margin: '0 20px',
      },
      firstCardView: {
         marginBottom: '90px',
      },
      card: {
         margin: '10px 0',
      },

      outline: {
         borderWidth: '1px',
         borderStyle: 'solid',
         borderRadius: '4px',
         borderColor: 'white',
      },
      outlineInner: {
         margin: theme.spacing(2),
      },
   }),
)
