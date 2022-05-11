import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        margin:'.5rem',
        background:"black",
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
        color:"black"
    },

    userSettings: {
        display:"flex",
        flexDirection:"column",
        alignItems: "center",
        width: "100%",
    },

    timeStamp: {
        fontSize:8,
        textAlign:"right",
        padding: "5px"
    },

    user: {
        justifyContent: "right",
        textAlign:"right"
    },

    recipient: {
        justifyContent: "left",
        textAlign:"left"
    },

    bubble:{
        background:"white",
        color:"black",
        paddingTop:"5px",
        paddingBottom:"5px",
        paddingInline:"10px",
        borderRadius:"15px"
    },

    container: {
        display: "flex",
        textAlign:"center",
        width:"100%",
        marginTop: "10px",
        justifyContent: "center",
        textAlign:"center",
    },

    rightBound:{
        textAlign:"right"
    },

    column:{
        display: "flex",
        flexDirection: "column",
        textAlign:"center",
        width:"100%",
        marginTop: "10px",
        justifyContent: "center",
    },

    row:{
        display: "flex",
        flexDirection: "row",
        textAlign:"center",
        width:"100%",
        marginTop: "10px",
        justifyContent: "center",
    },

    sidebarRow:{
        display: "flex",
        flexDirection: "row",
        textAlign:"center",
        width:"100%",
        marginTop: "10px",
        justifyContent: "center",
        [`@media (max-width: 600px)`]:{
            flexDirection:"column"
        }
    },

    sideBar:{
        display: "flex",
        flexDirection: "column",
        textAlign:"center",
        width:"fit-content",
        marginTop: "10px",
        justifyContent: "center",
        position:"absolute",
        left:"10px",
        zIndex:"10",
        [`@media (max-width: 600px)`]:{
            position:"static",
            margin:"0 auto"
        }
    },

    inputMessage:{
        margin:"0",
        padding:"0"
    },

    sendButton:{
        margin:"0",
        marginInline:"1rem"
    },
}));

export default useStyles
