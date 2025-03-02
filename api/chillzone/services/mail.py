import os
from django.core.mail import EmailMultiAlternatives
from email.mime.image import MIMEImage
from decouple import config

base_url = config('BASE_URL')

class EmailService:

    @staticmethod
    def send_reset_email(user_email, token):
        subject = "Demande de réinitialisation de mot de passe"
        from_email = "ChillZone - Mon IUT"
        to_email = [user_email]

        logo_path = os.path.join(os.getcwd(), "chillzone", "services", "img", "logo-zen-fill.png")

        html_message = f'''
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #F8F9FA; color: #000000;">
            <h2>Demande de réinitialisation de mot de passe</h2>
            <p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
            <p style="text-align: center;">
                <a href="{base_url}/reset-password?token={token}" style="background-color: #19887E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Réinitialiser mon mot de passe</a>
            </p>
            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
            <p>Cordialement,<br> L'équipe ChillZone - Mon IUT</p>
            <div style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #777;">
                <p>&copy; 2025 <a href="https://github.com/FC-Zen">FC-Zen</a>. Tous droits réservés.</p>
            </div>
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="cid:logo_zen" alt="Logo Zen" style="width: 100px;">
            </div>
        </body>
        </html>
        '''

        email = EmailMultiAlternatives(subject, "Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe.", from_email, to_email)
        email.attach_alternative(html_message, "text/html")

        try:
            with open(logo_path, "rb") as img:
                img_data = img.read()
                image = MIMEImage(img_data)
                image.add_header("Content-ID", "<logo_zen>")
                email.attach(image)

            email.send()
            return True
        except Exception as e:
            print(f"Erreur lors de l'envoi de l'email : {e}")
            return False

    @staticmethod
    def send_create_account_mail(user_mail, first_name, last_name, username, password):
        subject = "Vos identifiants de connexion à 'Mon IUT'"
        from_email = "ChillZone - Mon IUT"
        to_email = [user_mail]

        logo_path = os.path.join(os.getcwd(), "chillzone", "services", "img", "logo-zen-fill.png")

        html_message = f'''
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #F8F9FA; color: #000000;">
            <h2>Bienvenue sur Mon IUT</h2>
            <p>Bonjour <strong>{first_name} {last_name}</strong>,</p>
            <p>Votre compte a été créé avec succès par l'administrateur.</p>
            <p>Voici vos identifiants :</p>
            <div style="background-color: #19887E; color: white; padding: 15px; border-radius: 5px;">
                <p><strong>Adresse email :</strong> {user_mail}</p>
                <p><strong>Nom d'utilisateur :</strong> {username}</p>
                <p><strong>Mot de passe :</strong> {password}</p>
            </div>
            <p><strong>Important :</strong> Veuillez vous connecter et modifier votre mot de passe immédiatement.</p>
            <p style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
                <a href="{base_url}/login" style="background-color: #19887E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accéder à mon espace</a>
            </p>
            <p>Cordialement,<br> L'équipe ChillZone - Mon IUT</p>
            <div style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #777;">
                <p>&copy; 2025 <a href="https://github.com/FC-Zen">FC-Zen</a>. Tous droits réservés.</p>
            </div>
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="cid:logo_zen" alt="Logo Zen" style="width: 100px;">
            </div>
        </body>
        </html>
        '''

        email = EmailMultiAlternatives(subject, "Votre compte a été créé avec succès. Veuillez consulter vos identifiants.", from_email, to_email)
        email.attach_alternative(html_message, "text/html")

        try:
            with open(logo_path, "rb") as img:
                img_data = img.read()
                image = MIMEImage(img_data)
                image.add_header("Content-ID", "<logo_zen>")
                email.attach(image)

            email.send()
            return True
        except Exception as e:
            print(f"Erreur lors de l'envoi de l'email : {e}")
            return False

    @staticmethod
    def send_account_approval_email(user_email):
        """Envoie un e-mail confirmant l'acceptation de la demande de création de compte restaurant"""
        subject = "Votre demande de création de restaurant a été acceptée 🎉"
        from_email = "ChillZone - Mon IUT"
        to_email = [user_email]

        logo_path = os.path.join(os.getcwd(), "chillzone", "services", "img", "logo-zen-fill.png")

        html_message = f'''
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #F8F9FA; color: #000000;">
            <h2>✔️ Votre demande de création de restaurant et de votre compte a été refusée</h2>
            <p>Bonjour,</p>
            <p>Nous avons le plaisir de vous informer que votre demande de création de restaurant et de votre compte <strong>ChillZone - Mon IUT</strong> a été approuvée.</p>
            <p>Vous pouvez maintenant accéder à votre espace de gestion et commencer à gérer votre établissement.</p>
            <p style="text-align: center;">
                <a href="{base_url}/login" style="background-color: #19887E; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accéder à mon espace</a>
            </p>
            <p>Cordialement,<br> L'équipe ChillZone - Mon IUT</p>
            <div style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #777;">
                <p>&copy; 2025 <a href="https://github.com/FC-Zen">FC-Zen</a>. Tous droits réservés.</p>
            </div>
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="cid:logo_zen" alt="Logo Zen" style="width: 100px;">
            </div>
        </body>
        </html>
        '''

        email = EmailMultiAlternatives(subject, "Votre demande de création de compte a été acceptée.", from_email, to_email)
        email.attach_alternative(html_message, "text/html")

        try:
            with open(logo_path, "rb") as img:
                img_data = img.read()
                image = MIMEImage(img_data)
                image.add_header("Content-ID", "<logo_zen>")
                email.attach(image)

            email.send()
            return True
        except Exception as e:
            print(f"Erreur lors de l'envoi de l'email : {e}")
            return False

    @staticmethod
    def send_account_rejection_email(user_email):
        """Envoie un e-mail informant que la demande de création de compte restaurant a été refusée"""
        subject = "Votre demande de création de restaurant a été refusée ❌"
        from_email = "ChillZone - Mon IUT"
        to_email = [user_email]

        logo_path = os.path.join(os.getcwd(), "chillzone", "services", "img", "logo-zen-fill.png")

        html_message = f'''
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #F8F9FA; color: #000000;">
            <h2>❌ Votre demande de création de restaurant et de votre compte a été refusée</h2>
            <p>Bonjour,</p>
            <p>Nous sommes désolés de vous informer que votre demande de création de restaurant et de votre compte <strong>ChillZone - Mon IUT</strong> a été refusée.</p>
            <p>Vos informations ont été supprimées de notre base de données et vous pouvez toujours reformuler une demande plus tard.</p>
            <p>Si vous avez des questions ou souhaitez en savoir plus, vous pouvez contacter notre équipe.</p>
            <p>Cordialement,<br> L'équipe ChillZone - Mon IUT</p>
            <div style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #777;">
                <p>&copy; 2025 <a href="https://github.com/FC-Zen">FC-Zen</a>. Tous droits réservés.</p>
            </div>
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="cid:logo_zen" alt="Logo Zen" style="width: 100px;">
            </div>
        </body>
        </html>
        '''

        email = EmailMultiAlternatives(subject, "Votre demande de création de compte a été refusée.", from_email, to_email)
        email.attach_alternative(html_message, "text/html")

        try:
            with open(logo_path, "rb") as img:
                img_data = img.read()
                image = MIMEImage(img_data)
                image.add_header("Content-ID", "<logo_zen>")
                email.attach(image)

            email.send()
            return True
        except Exception as e:
            print(f"Erreur lors de l'envoi de l'email : {e}")
            return False