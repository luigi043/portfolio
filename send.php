
  <?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura os dados do formulário
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Defina o seu e-mail de destino (onde você quer receber as mensagens)
    $to = "cluiz4003@gmail.com";  // Substitua pelo seu e-mail

    // Assunto do e-mail
    $subject = "New message from: $name";

    // Corpo do e-mail
    $body = "
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Message:</strong></p>
    <p>$message</p>
    ";

    // Cabeçalhos para o e-mail em HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n"; // Quem está enviando o e-mail

    // Envia o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Error: Message not sent.";
    }
} else {
    echo "Invalid request.";
}
?>

  a:hover {
    color: #03346E; /* Azul escuro */
  }
  
  /* Botões */
  button {
    background-color: #03346E; /* Azul médio */
    color: #E2E2B6; /* Bege claro */
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  button:hover {
    background-color: #021526; /* Azul bem escuro */
    transform: scale(1.05);
  }
  
  
/* Containers e Layout */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
    gap: 50px;
    flex-wrap: wrap;
    max-width: 100%;
  }
  
  .text {
    padding: 100px 20px;
    max-width: 600px;
  }

  #animated-name {
    font-size: 2.5rem;
    color: #007BFF;
    width: 0;
    white-space: nowrap;
    overflow: hidden;
    border-right: 4px solid #007BFF;
    animation: typing 3s steps(15) 1s forwards, blink 0.75s step-end infinite;
  }
/* Tipografia */
h1, .bigHome, .highlight {
    font-weight: bold;
  }
  
  h1 {
    font-size: 3rem;
  }
  .mediumHome {
    font-size: 18px;
    max-width: 700px;
    margin: auto;
    line-height: 1.6;
  }
  
  .cv-section, .project-card {
    text-align: center;
  }
  
  .fa-arrow-down {
    font-size: 30px;
    margin: 20px 0;
    color: #007BFF;
    animation: bounce 1s infinite;
  }
  
  /* Botões */
button {
    padding: 0.6rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  /* Imagens */
  img {
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    height: auto;
    object-fit: cover;
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.8);
    animation: ledGlow 1.5s infinite alternate;
  }

  /* Links */
a {
    text-decoration: none;
  }
  
  .cv a, .cv-link {
    background: #007BFF;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }
  
  .cv a:hover, .cv-link:hover {
    background: #0056b3;
  }
  
/* Sobre Mim */
#about-me {
    background-color: #f9f9f9;
    padding: 40px 20px;
    margin-bottom: 40px;
    border-radius: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 1600px;
    margin: auto;
  }
  #about-me h2 {
    font-size: 1.75rem;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }

  #about-me p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    max-width: 1450px;
    margin: auto;
    text-align: center;
  }
  .about-me-content {
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  .educational-journey, .personal-interests {
    width: 48%;
  }



/* Estilos para a seção de Tecnologias */
.tech-charts {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.tech-item {
    text-align: center;
}

canvas {
    width: 120px !important;
    height: 120px !important;
}


/* Estilos Gerais */
.tech-category {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 50px;
    opacity: 0;
    transform: translateY(50px);
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
  
  .tech-category.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .tech-item {
    width: 23%;
    text-align: center;
    padding: 25px;
    border-radius: 10px;
    background-color: rgba(11, 25, 44, 0.8);
    box-shadow: 0 4px 30px rgba(110, 172, 218, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
  }
  
  .tech-item:hover {
    transform: translateY(-15px);
    background-color: rgba(110, 172, 218, 0.2);
    box-shadow: 0 8px 40px rgba(110, 172, 218, 0.4);
  }
  
  .tech-item h3 {
    font-size: 1.8rem;
    color: #03346E;
    margin-bottom: 20px;
    transition: color 0.3s ease-in-out;
  }
  
  .tech-item ul {
    list-style-type: none;
    padding: 0;
  }
  
  .tech-item ul li {
    font-size: 1.2rem;
    margin: 10px 0;
    transition: color 0.3s ease-in-out;
  }
  
  .tech-item .icon {
    font-size: 3.5rem;
    color: #6EACDA;
    margin-bottom: 20px;
    transition: transform 0.3s ease-in-out;
  }
  
  .tech-item:hover .icon {
    transform: rotate(360deg);
  }
  
  /* Animações AOS */
  [data-aos="fade-up"] {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  [data-aos="fade-up"].aos-animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Gradiente de fundo animado */
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* Animação de FadeIn */
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

   /* Estilos gerais para o container */
   #projects {
    padding: 40px 20px;
    background-color: #121212;
    color: #fff;
    text-align: center;
}

#projects h2 {
    font-size: 32px;
    color: #007BFF;
    margin-bottom: 30px;
}

/* Contêiner dos cards de projeto */
.project-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 colunas */
    gap: 20px;
    justify-items: center;
    padding: 20px;
}

/* Estilos para cada card de projeto */
.project-card {
    background-color: #2a2a2a;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: left;
    transition: transform 0.3s ease-in-out;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-image {
    width: 80%; /* Reduzindo o tamanho da imagem para 80% do seu tamanho original */
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
}

.project-card h3 {
    font-size: 22px;
    color: #fff;
    margin-bottom: 10px;
}

.project-card p {
    font-size: 16px;
    color: #ddd;
    margin-bottom: 15px;
}

.project-card ul {
    list-style-type: none;
    padding-left: 0;
}

.project-card ul li {
    font-size: 14px;
    color: #ddd;
}

/* Links no card de projeto */
.project-card a {
    color: #007BFF;
    font-size: 16px;
    text-decoration: none;
    transition: color 0.3s ease;
}

.project-card a:hover {
    color: #0056b3;
}

/* Responsividade para telas menores */
@media (max-width: 1024px) {
    .project-container {
        grid-template-columns: repeat(2, 1fr); /* 2 colunas */
    }
}

@media (max-width: 768px) {
    .project-container {
        grid-template-columns: 1fr; /* 1 coluna */
    }
}

/** redes sociais*/
.social-icons a {
    margin: 10px;
    font-size: 30px;
    color: #fff;
  }
  
  .social-icons a:hover {
    color: #007BFF;
  }

     /* Estágio */
     #internship {
        background-color: #0B192C;
        padding: 50px 20px;
        border-radius: 12px;
        color: #E2E2B6;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        max-width: 1200px;
        margin: auto;
        font-family: "Arial", sans-serif;
      }

      #internship h3 {
        font-size: 28px;
        font-weight: bold;
        color: #6EACDA;
        text-align: center;
        margin-bottom: 20px;
      }

      /* Estilização da Empresa */
      .company-info {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        animation: fadeIn 1.5s ease-in-out;
      }

      .company-logo {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }

      .company-info h4 {
        font-size: 22px;
        margin: 0;
        font-weight: bold;
        color: #6EACDA;
      }

      .company-info p {
        margin: 5px 0;
        font-size: 16px;
      }

      /* Layout das Skills e Impacto */
      .skills-and-impact {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-top: 20px;
      }

      .skills, .impact {
        background-color: #03346E;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        animation: fadeIn 2s ease-in-out;
      }

      .skills h4, .impact h4 {
        font-size: 22px;
        color: #6EACDA;
        margin-bottom: 15px;
      }

      .skills ul {
        list-style-type: none;
        padding-left: 0;
      }

      .skills ul li {
        font-size: 16px;
        line-height: 1.6;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .skills ul li strong {
        color: #6EACDA;
      }

      .impact p {
        font-size: 16px;
        line-height: 1.6;
      }

      /* Animação para fade-in */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Adaptação para Mobile */
      @media (max-width: 768px) {
        .company-info {
          flex-direction: column;
          text-align: center;
        }

        .skills-and-impact {
          grid-template-columns: 1fr;
        }
      }

      /* Animação das letras */
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Certificações e Cursos */
      #certifications {
        background-color: #121212; /* Fundo escuro */
        color: #fff;
        padding: 40px 20px;
        margin: 30px auto;
        max-width: 900px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        
        /* Centralização com Flexbox */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto; /* Ajusta a altura conforme o conteúdo */
      }

      #certifications h2 {
        font-size: 28px;
        color: #007BFF;
        margin-bottom: 20px;
        animation: fadeInUp 1s ease-out;
      }

      #certifications ul {
        list-style-type: none;
        padding: 0;
      }

      #certifications li {
        font-size: 18px;
        color: #ddd;
        margin-bottom: 10px;
        text-align: left;
        opacity: 0; /* Começa invisível */
        animation: fadeInUp 1s ease-out forwards; /* Animação para cada item */
        animation-delay: 0.3s; /* Delay entre os itens */
      }

      #certifications li:nth-child(1) {
        animation-delay: 0.3s;
      }

      #certifications li:nth-child(2) {
        animation-delay: 0.5s;
      }

      #certifications li:nth-child(3) {
        animation-delay: 0.7s;
      }

      #certifications li:nth-child(4) {
        animation-delay: 0.9s;
      }

      #certifications li:nth-child(5) {
        animation-delay: 1.1s;
      }

      #certifications li:nth-child(6) {
        animation-delay: 1.3s;
      }

      #certifications li:nth-child(7) {
        animation-delay: 1.5s;
      }

      #certifications li:nth-child(8) {
        animation-delay: 1.7s;
      }

      #certifications li:before {
        content: "✔️";
        margin-right: 10px;
        color: #007BFF;
      }

      #certifications li a {
        color: #007BFF;
        text-decoration: none;
        font-weight: bold;
      }

      #certifications li a:hover {
        text-decoration: underline;
      }

       /* Contact Section */
       #contact {
        background-color: #021526; /* Dark background */
        color: #E2E2B6; /* Light text */
        padding: 50px 20px;
        margin: 30px auto;
        max-width: 900px;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        animation: fadeInUp 1s ease-out;
        text-align: center;
      }

      #contact h2 {
        font-size: 32px;
        color: #6EACDA; /* Light blue */
        margin-bottom: 20px;
        animation: typing 2s steps(30) 1s 1 normal both;
        overflow: hidden;
        border-right: .1em solid #6EACDA;
      }

      #contact p {
        font-size: 18px;
        animation: fadeInUp 1.5s ease-out;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        animation: fadeInUp 1s ease-out;
        align-items: center;
      }

      .contact-form input, .contact-form textarea {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #03346E; /* Blue background for input fields */
        color: #fff;
        font-size: 16px;
        transition: border-color 0.3s ease;
        width: 100%;
        max-width: 500px;
      }

      .contact-form input:focus, .contact-form textarea:focus {
        border-color: #6EACDA; /* Light blue on focus */
        outline: none;
      }

      .contact-form button {
        padding: 12px 20px;
        background-color: #03346E; /* Blue background */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        transition: background-color 0.3s ease;
      }

      .contact-form button:hover {
        background-color: #0B192C; /* Darker shade for hover effect */
      }

      /* Animation for text typing effect */
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      /* Animation for fade-in effect */
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Experience Section */
      #experience {
        padding: 50px 20px;
        background-color: #0B192C; /* Dark background */
        color: #E2E2B6; /* Light text */
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        animation: fadeInUp 1s ease-out;
      }

      #experience h2 {
        font-size: 32px;
        color: #6EACDA; /* Light blue */
        margin-bottom: 30px;
        animation: fadeInUp 1s ease-out;
      }

      #experience ul {
        list-style-type: none;
        padding-left: 0;
        margin: 0;
      }

      #experience ul li {
        font-size: 18px;
        color: #ddd;
        margin-bottom: 20px;
        line-height: 1.6;
        animation: fadeInUp 1s ease-out;
      }

      #experience ul li strong {
        font-size: 20px;
        color: #fff;
      }

      #experience ul li em {
        font-style: italic;
        color: #bbb;
      }

      /* Dark mode styles */
      .dark-mode {
        background-color: #121212;
        color: #fff;
      }

      .dark-mode #contact {
        background-color: #021526;
      }

      .dark-mode #contact h2 {
        color: #6EACDA;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        #contact h2 {
          font-size: 28px;
        }

        .contact-form input, .contact-form textarea {
          font-size: 14px;
        }

        .contact-form button {
          font-size: 16px;
        }
      }

      

 /* Estilo do Footer */
 footer {
    background-color: #021526; /* Dark blue */
    color: #E2E2B6; /* Light color */
    padding: 20px 0;
    text-align: center;
    font-size: 16px;
    position: relative;
    bottom: 0;
    width: 100%;
  }
  
  footer a {
    color: #6EACDA; /* Light blue for links */
    text-decoration: none;
    font-weight: bold;
  }
  
  footer a:hover {
    color: #03346E; /* Medium blue for hover effect */
  }
  
  footer .social-icons {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  footer .social-icons a {
    font-size: 36px;
    color: #6EACDA; /* Light blue for social icons */
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  footer .social-icons a:hover {
    transform: scale(1.2); /* Grow effect */
    color: #03346E; /* Change color on hover */
  }
  
  footer .copyright,
  footer .design {
    margin: 5px 0;
    font-size: 14px;
    color: #E2E2B6;
    white-space: nowrap;
    overflow: hidden;
  }
  
  /* Typewriter animation */
  .typewriter {
    display: inline-block;
    animation: typing 3s steps(40) 1s forwards, blink 0.75s step-end infinite;
  }
  
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
  
  /* Scroll animation */
  section {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  section.visible {
    opacity: 1;
  }