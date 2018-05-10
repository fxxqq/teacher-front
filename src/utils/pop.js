import sweetalert from "sweetalert";
import sureIcon from '../public/img/sure.png'
class Popup {
    /**
     * @method 提示公用弹窗
     * @param {} 
     * @author frank
     */
    surePopup(content, callback) {
        swal({
            text: content,
            icon: sureIcon,
            className: "hi-sure-pop",
            button: {
                text: "Confirm",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
            },
        }).then((value) => {
            if (callback) {
                callback();
            }
        });
    };

}
export default new Popup;