 
from faker import Faker
import random
from datetime import datetime, timedelta

class Tester:
    
    def __init__(self):
        self.fake=Faker()
        
    
    def create_user(self, companies, groups):
        return  {'Username':self.fake.user_name(), 'Password': self.fake.password(8),'Company': random.choice(companies), 'Type': random.choice(groups)}
    
    def create_users(self,n:int, companies, groups):
        users=[]
        for _ in range(n): users.append(self.create_user(companies, groups))
        return users
    
    def create_company(self):
        return {'Limit': self.fake.pyfloat(min_value=4000.00, max_value= 6000.00, right_digits=2),
                'Increase': 20,
                'Extra_Percent': 15,
                'Type': f'type{random.randint(1, 10) }',
                'Name': self.fake.company(),
                'Addr': self.fake.address()}

    def create_companies(self, n: int):
        companies=[]
        for _ in range(n): companies.append(self.create_company())
        return companies
    
    def create_area(self, companies):
        # Lista de posibles áreas dentro de una compañía
        areas_empresa = [
            "Recursos Humanos",
            "Finanzas",
            "Contabilidad",
            "Administración",
            "Ventas",
            "Marketing",
            "Atención al Cliente",
            "Soporte Técnico",
            "Desarrollo de Producto",
            "Investigación y Desarrollo (I+D)",
            "Producción",
            "Logística",
            "Almacén",
            "Compras",
            "Tecnología de la Información (TI)",
            "Seguridad Informática",
            "Mantenimiento",
            "Calidad",
            "Seguridad y Salud Ocupacional",
            "Relaciones Públicas",
            "Asesoría Legal",
            "Servicio Postventa",
            "Innovación",
            "Planeación Estratégica",
            "Control de Gestión",
            "Auditoría Interna",
            "Proyectos Especiales",
            "Operaciones",
            "Sostenibilidad y Responsabilidad Social",
            "Diseño Gráfico",
            "Desarrollo Web",
            "Capacitación y Desarrollo",
            "Seguridad Física",
            "Relaciones Industriales",
            "Medio Ambiente",
            "Gestión de Energía",
            "Expansión y Nuevos Negocios"
        ]

        return {'Name': random.choice(areas_empresa)+ self.fake.text(6), 'Company': random.choice(companies), 'Responsible': self.fake.name()}
    
    def create_areas(self, n: int, companies):
        areas=[]
        for _ in range(n): areas.append(self.create_area(companies))
        return areas
    
    def create_equipment(self, areas):
        area= random.choice(areas)
        equipos_electricos = [
            # Oficinas y espacios administrativos
            "Computadora de escritorio",
            "Laptop",
            "Impresora",
            "Fotocopiadora",
            "Escáner",
            "Monitor",
            "Teléfono IP",
            "Ruteador de red",
            "Switch de red",
            "Luminaria LED",
            "Aire acondicionado de pared",
            "Sistema de videoconferencia",

            # Áreas industriales y talleres
            "Motor eléctrico",
            "Compresor de aire",
            "Taladro eléctrico",
            "Sierra eléctrica",
            "Soldadora",
            "Sistema de extracción de polvo",
            "Horno industrial",
            "Bomba de agua",
            "Transformador",
            "Sistema de automatización (PLC)",
            "Panel HMI",

            # Cocinas y comedores
            "Refrigerador",
            "Microondas",
            "Horno eléctrico",
            "Máquina de café",
            "Tostadora",
            "Dispensador de agua fría y caliente",
            "Licuadora industrial",

            # Sistemas de seguridad y soporte
            "Cámara de seguridad (CCTV)",
            "Servidor",
            "UPS (Uninterruptible Power Supply)",
            "Detector de humo",
            "Detector de monóxido de carbono",
            "Panel de control de alarmas",
            "Estación de carga para vehículos eléctricos",

            # Áreas de almacenamiento
            "Montacargas eléctrico",
            "Estantería móvil automatizada",
            "Sensor de temperatura",
            "Sensor de humedad",
            "Puerta automática",

            # Áreas generales
            "Ventilador industrial",
            "Calentador de ambiente",
            "Tablero eléctrico",
            "Generador eléctrico de respaldo",
            "Sistema de paneles solares"
        ]
        # Lista de marcas para equipos eléctricos
        marcas_equipos = [
            "Samsung",
            "LG",
            "Sony",
            "Dell",
            "HP",
            "Lenovo",
            "Apple",
            "Asus",
            "Acer",
            "Brother",
            "Canon",
            "Epson",
            "Panasonic",
            "Bosch",
            "Whirlpool",
            "Midea",
            "Daikin",
            "Carrier",
            "General Electric",
            "Siemens",
            "Electrolux",
            "Hitachi",
            "Toshiba",
            "Sharp",
            "Honeywell",
            "Philips",
            "Cisco",
            "Netgear",
            "TP-Link",
            "Huawei",
            "Zebra",
            "Lexmark",
            "Pioneer",
            "Mitsubishi Electric",
            "Schneider Electric",
            "Trane",
            "Rheem",
            "Emerson",
            "Haier",
            "Fujitsu",
            "3M",
            "Yamaha",
            "ViewSonic",
            "BenQ",
            "Logitech",
            "NVIDIA",
            "Intel",
            "AMD",
            "Western Digital",
            "Seagate",
            "Corsair"
        ]

        return{'Area': area[0], 'Company': area[1], 
               'Type':random.choice(equipos_electricos),
               'Brand': random.choice(marcas_equipos),
               'Installation_Date': self.fake.date_between(start_date="-1000d", end_date="today").strftime("%Y-%m-%d")
               }
    
    def create_equipments(self, n: int, areas):
        equipments=[]
        for _ in range(n): equipments.append(self.create_equipment(areas))
        return equipments    
    
    def create_bills(self, n: int, date: datetime, company):
        bills=[]
        reading= 0
        for i in range(n):
            reading+= random.uniform(50, 300)
            actual_date= date + timedelta(days=i)
            str_date= actual_date.strftime("%Y-%m-%d")
            bills.append({'Date': str_date , 'Company': company, 'Reading': reading})    
        return bills    




