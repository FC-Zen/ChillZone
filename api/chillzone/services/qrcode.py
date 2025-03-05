from decouple import config
import qrcode
import os

base_url = config('BASE_URL')

class QRCodeService:
    @staticmethod
    def generate_qr_code(data: str = "https://example.com", dirpath: str = "media/qrcode/", filename: str = "qr_code.png", fillcolor: str = "#2E2A85", backcolor: str = None) -> str:
        """
        Génère un QRCode avec un fond transparent et une couleur spécifique.
        :param data: Les données à encoder dans le QR Code (default: "https://example.com").
        :param dirpath: Le dossier où enregistrer le fichier QR Code (default: "../../medial/qrcodes/").
        :param filename: Le nom du fichier QR Code (default: "qr_code.png").
        :param fillcolor: La couleur de remplissage du QRCode (default: "#2E2A85").
        :param backcolor: La couleur de fond du QRCode (default: None).
        :return: Le nom du fichier QR Code généré.
        """

        if os.path.exists(dirpath):
            output_path = os.path.join(os.getcwd(), dirpath, filename)
        else :
            output_path = os.path.join(os.getcwd(), 'chillzone', dirpath, filename)
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=0
        )
        qr.add_data(data)
        qr.make(fit=True)

        if backcolor is None :
            qr_img = qr.make_image(fill_color=fillcolor, back_color="white").convert("RGBA")
            
            datas = qr_img.getdata()
            new_data = []
            for item in datas:
                if item[:3] == (255, 255, 255):
                    new_data.append((255, 255, 255, 0))
                else:
                    new_data.append(item)

            qr_img.putdata(new_data)

        else :
            qr_img = qr.make_image(fill_color=fillcolor, back_color=backcolor)        
        
        qr_img.save(output_path, format='PNG')
        return filename
    
    @staticmethod
    def generate_qr_code_command(command_id: int, dirpath: str = "media/qrcode/", filename: str = "qr_code.png", fillcolor: str = "#2E2A85", backcolor: str = None) -> str:
        """
        Génère un QRCode avec un fond transparent et une couleur spécifique.
        :param required id: L'id de ma commande sur laquelle faut rediriger le QR Code.
        :param dirpath: Le dossier où enregistrer le fichier QR Code (default: "../../medial/qrcodes/").
        :param filename: Le nom du fichier QR Code (default: "qr_code.png").
        :param fillcolor: La couleur de remplissage du QRCode (default: "#2E2A85").
        :param backcolor: La couleur de fond du QRCode (default: None).
        :return: Le nom du fichier QR Code généré.
        """

        if not command_id:
            raise ValueError("L'id de la commande est requis pour générer le QR Code.")
        else :
            data = f"{base_url}/command/{command_id}"
            return QRCodeService.generate_qr_code(data, dirpath, filename, fillcolor, backcolor)
    