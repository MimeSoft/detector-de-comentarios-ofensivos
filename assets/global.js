const API_KEY = 'INGRESAR_LA_API_KEY_OBTENIDA'; // Reemplaza con tu clave API de Google Cloud

async function analizarTexto() {
    const texto = document.getElementById('text-input').value;

    const requestBody = {
        comment: { text: texto },
        languages: ['es'],
        requestedAttributes: { TOXICITY: {} }
    };

    const response = await fetch(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    let toxicidad = data.attributeScores.TOXICITY.summaryScore.value;
    
    if (toxicidad > 0.5) {
        toast("error", "Este comentario es toxico");
        } else {
        toast("success", "Este comentario no es toxico");
    }

    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}

const toast = (type, message) => {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: type,
        title: message
    });

}