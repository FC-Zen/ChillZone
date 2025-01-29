class QRCodeService:
    @staticmethod
    def generate_qr_code(data: str, dirpath: str = "./qrcodes/", filename: str = "qr_code.png") -> str:
        """
        Génère un QRCode avec un fond transparent et une couleur spécifique.
        :param data: Les données à encoder dans le QR Code.
        :param dirpath: Le dossier où enregistrer le fichier QR Code.
        :param filename: Le nom du fichier QR Code.
        :return: Le chemin du fichier QR Code généré.
        """
        import qrcode
        import os

        os.makedirs(dirpath, exist_ok=True)
        output_path = os.path.join(dirpath, filename)
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=0
        )
        qr.add_data(data)
        qr.make(fit=True)
        
        qr_img = qr.make_image(fill_color="#2E2A85", back_color="white").convert("RGBA")
        
        datas = qr_img.getdata()
        new_data = []
        for item in datas:
            if item[:3] == (255, 255, 255):
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        qr_img.putdata(new_data)
        
        qr_img.save(output_path, format='PNG')
        return output_path