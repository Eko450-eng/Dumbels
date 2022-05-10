import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        margin:'.5rem',
    },

    input: {
        height: 'auto',
        paddingTop: 18,
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm / 2,
        zIndex: 1,
    },
}));


export default useStyles
