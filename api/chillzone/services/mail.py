class EmailService:

    @staticmethod
    def send_reset_email(user_email, reset_link):
        from django.core.mail import send_mail

        try:
            send_mail(
                subject="Demande de réinitialisation de mot de passe",
                message=f"Cliquer sur le lien pour réinitialiser votre mot de passe : {reset_link} \n Si cela ne vient pas de votre initiative, veuillez ignorer ce mail",
                from_email="but3.chillzone@gmail.com",
                recipient_list=[user_email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            return False
    
    @staticmethod
    def send_create_account_mail(user_mail, first_name, last_name, username, password):
        from django.core.mail import send_mail

        try:
            send_mail(
                subject="Vos identifiants de connexion à \"Mon IUT\"",
                message=(
                    f"Bonjour {first_name} {last_name},\n\n"
                    f"Votre compte a été créé avec succès par l'administrateur.\n"
                    f"Voici vos identifiants :\n"
                    f"Email : identique à celle sur laquelle vous recevez ce mail\n"
                    f"Nom d'utilisateur : {username}\n"
                    f"Mot de passe : {password}\n\n"
                    "Veuillez vous connecter et modifier votre mot de passe immédiatement."
                ),
                from_email="but3.chillzone@gmail.com",
                recipient_list=[user_mail],
                fail_silently=False,
            )
            return True
        except Exception as e:
            return False