export default class UtilsFunc {
    static withCRUDUtils(props) {
        return {
            dialog: {
                create: false,
                update: false,
                ...props.dialog
            },
            
            onSelectRow(row, dialog) {
                this.selectedRow = { ...row }
                this.dialog[dialog] = true
            }
        }
    }
}