import { toast } from 'react-toastify';

class ToastNotificationManager {
    static success(message, options = {}) {
        toast.success(message,
            {
                ...options,
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
    }

    static error(message, options = {}) {
        toast.error(message,
            {
                ...options,
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
    }

    static errorMultiLine(message, options = {}) {
        console.log("MUltiLine")
        toast.error(message,
            {
                ...options,
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                render: () => <div dangerouslySetInnerHTML={{ __html: message }}></div >
            });
    }

    static info(message, options = {}) {
        toast.info(message,
            {
                ...options,
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
    }

    static warning(message, options = {}) {
        toast.warn(message,
            {
                ...options,
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
    }

    // Pode adicionar mais métodos conforme necessário
}

export default ToastNotificationManager;