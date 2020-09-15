import swal from 'sweetalert'

export const utilService = {
    showConfirmationAlert
};

function showConfirmationAlert(title, message, icon, button, dangerMode) {
    return new Promise((resolve, reject) => {
        swal({ title: title, text: message, icon: icon, buttons: button, dangerMode: dangerMode }).then((willDelete) => {
            if (willDelete) {
                return resolve(true)
            } else {
                return reject(false)
            }
        }).catch(() => { })
    })
}
