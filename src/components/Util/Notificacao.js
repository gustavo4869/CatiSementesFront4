import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

class Notificacao {
    static sucesso(titulo, mensagem) {
        NotificationManager.success(mensagem, titulo, 3000, null, true);
    }

    static informacao(titulo, mensagem) {
        NotificationManager.info(mensagem, titulo, 3000, null, true);
    }

    static alerta(titulo, mensagem) {
        NotificationManager.warning(mensagem, titulo, 3000, null, true);
    }

    static erro(titulo, mensagem) {
        NotificationManager.error(mensagem, titulo, 3000, null, true);
    }
}

export default Notificacao;