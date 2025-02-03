 
from faker import Faker
import random
from datetime import datetime, timedelta, date

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
        branch_types = [
            "Corporate Office",
            "Distribution Center",
            "Production Plant",
            "Retail Store",
            "Warehouse",
            "Customer Service Branch",
            "Data Center",
            "Service Station",
            "Administrative Building",
            "Laboratory",
            "Factory",
            "University Campus",
            "Hospital or Clinic",
            "Hotel",
            "Supermarket",
        ]
        return {'Limit': self.fake.pyfloat(min_value=4000.00, max_value= 6000.00, right_digits=2),
                'Increase': random.randint(20, 60),
                'Extra_Percent': random.randint(10, 50),
                'Type': random.choice(branch_types),
                'Name': self.fake.company(),
                'Addr': self.fake.address()
                }

    def create_companies(self, n: int):
        companies=[]
        for _ in range(n): companies.append(self.create_company())
        return companies
    
    def create_area(self, companies):
        # Lista de posibles áreas dentro de una compañía
        company_areas = [
            "Human Resources",
            "Finance",
            "Accounting",
            "Administration",
            "Sales",
            "Marketing",
            "Customer Service",
            "Technical Support",
            "Product Development",
            "Research and Development (R&D)",
            "Production",
            "Logistics",
            "Warehouse",
            "Purchasing",
            "Information Technology (IT)",
            "Cybersecurity",
            "Maintenance",
            "Quality",
            "Occupational Health and Safety",
            "Public Relations",
            "Legal Advisory",
            "After-Sales Service",
            "Innovation",
            "Strategic Planning",
            "Management Control",
            "Internal Audit",
            "Special Projects",
            "Operations",
            "Sustainability and Corporate Social Responsibility",
            "Graphic Design",
            "Web Development",
            "Training and Development",
            "Physical Security",
            "Industrial Relations",
            "Environment",
            "Energy Management",
            "Expansion and New Business"
        ]

        return {'Name': random.choice(company_areas)+ self.fake.text(6), 'Company': random.choice(companies), 'Responsible': self.fake.name()}
    
    def create_areas(self, n: int, companies):
        areas=[]
        for _ in range(n): areas.append(self.create_area(companies))
        return areas
    
    def create_equipment(self, areas):
        area= random.choice(areas)

            
        equipment_brands = [
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

        maintenance_statuses = [
            "Operational",
            "Under Repair",
            "Scheduled Maintenance",
            "Decommissioned",
            "Pending Inspection",
            "Partially Operational",
            "Requires Upgrade",
            "Energy Optimization Required",
            "Critical Failure",
            "Awaiting Spare Parts",
            "Under Performance Review",
            "Newly Installed",
            "Temporarily Out of Service"
        ]

        usage_frequencies = [
            "Daily",
            "Multiple times per day",
            "Weekly",
            "Bi-weekly",
            "Monthly",
            "Seasonal",
            "Occasionally",
            "Continuous Operation",
            "On-Demand",
            "Peak Hours Only",
            "Night-Shift Only",
            "Rarely Used",
            "24/7 Operation"
        ]
        
        electrical_equipment_kw = {
            # Offices and administrative spaces
            "Desktop computer": 0.3,  # 300W
            "Laptop": 0.06,  # 60W
            "Printer": 0.5,  # 500W (Laser)
            "Photocopier": 1.2,  # 1200W
            "Scanner": 0.2,  # 200W
            "Monitor": 0.05,  # 50W
            "IP phone": 0.01,  # 10W
            "Network router": 0.015,  # 15W
            "Network switch": 0.05,  # 50W
            "LED light": 0.02,  # 20W
            "Wall-mounted air conditioner": 3.5,  # 3.5 kW
            "Videoconferencing system": 0.1,  # 100W

            # Industrial areas and workshops
            "Electric motor": 5.0,  # 5 kW (variable depending on application)
            "Air compressor": 7.5,  # 7.5 kW
            "Electric drill": 0.8,  # 800W
            "Electric saw": 1.5,  # 1500W
            "Welder": 10.0,  # 10 kW
            "Dust extraction system": 4.0,  # 4 kW
            "Industrial oven": 15.0,  # 15 kW
            "Water pump": 3.0,  # 3 kW
            "Transformer": 50.0,  # 50 kW (depends on size)
            "Automation system (PLC)": 0.5,  # 500W
            "HMI panel": 0.3,  # 300W

            # Kitchens and dining areas
            "Refrigerator": 0.15,  # 150W
            "Microwave": 1.2,  # 1.2 kW
            "Electric oven": 2.0,  # 2 kW
            "Coffee machine": 1.0,  # 1 kW
            "Toaster": 0.8,  # 800W
            "Cold and hot water dispenser": 0.5,  # 500W
            "Industrial blender": 1.5,  # 1500W

            # Security and support systems
            "Security camera (CCTV)": 0.01,  # 10W
            "Server": 1.0,  # 1 kW
            "UPS (Uninterruptible Power Supply)": 3.0,  # 3 kW
            "Smoke detector": 0.005,  # 5W
            "Carbon monoxide detector": 0.005,  # 5W
            "Alarm control panel": 0.03,  # 30W
            "Electric vehicle charging station": 22.0,  # 22 kW

            # Storage areas
            "Electric forklift": 10.0,  # 10 kW
            "Automated mobile shelving": 2.0,  # 2 kW
            "Temperature sensor": 0.002,  # 2W
            "Humidity sensor": 0.002,  # 2W
            "Automatic door": 0.75,  # 750W

            # General areas
            "Industrial fan": 1.5,  # 1.5 kW
            "Space heater": 2.5,  # 2.5 kW
            "Electrical panel": 0.3,  # 300W (depends on connected equipment)
            "Backup generator": 100.0,  # 100 kW (depends on size)
            "Solar panel system": 5.0  # 5 kW (depends on installation)
        }

        daily_power_consumption_kw = {
            # Offices and administrative spaces
            "Desktop computer": 2.4,  # (300W * 8h)
            "Laptop": 0.48,  # (60W * 8h)
            "Printer": 1.5,  # (500W * 3h intermittent use)
            "Photocopier": 3.6,  # (1200W * 3h)
            "Scanner": 0.6,  # (200W * 3h)
            "Monitor": 0.4,  # (50W * 8h)
            "IP phone": 0.08,  # (10W * 8h)
            "Network router": 0.36,  # (15W * 24h)
            "Network switch": 1.2,  # (50W * 24h)
            "LED light": 0.16,  # (20W * 8h)
            "Wall-mounted air conditioner": 28,  # (3.5kW * 8h)
            "Videoconferencing system": 0.5,  # (100W * 5h)

            # Industrial areas and workshops
            "Electric motor": 40,  # (5kW * 8h)
            "Air compressor": 60,  # (7.5kW * 8h)
            "Electric drill": 2.4,  # (800W * 3h intermittent use)
            "Electric saw": 4.5,  # (1.5kW * 3h)
            "Welder": 50,  # (10kW * 5h)
            "Dust extraction system": 32,  # (4kW * 8h)
            "Industrial oven": 120,  # (15kW * 8h)
            "Water pump": 24,  # (3kW * 8h)
            "Transformer": 200,  # (50kW * 4h intermittent use)
            "Automation system (PLC)": 4,  # (500W * 8h)
            "HMI panel": 2.4,  # (300W * 8h)

            # Kitchens and dining areas
            "Refrigerator": 1.8,  # (150W * 12h, compressor doesn't work all day)
            "Microwave": 1.2,  # (1.2kW * 1h)
            "Electric oven": 6,  # (2kW * 3h)
            "Coffee machine": 3,  # (1kW * 3h)
            "Toaster": 0.4,  # (800W * 0.5h)
            "Cold and hot water dispenser": 2.5,  # (500W * 5h)
            "Industrial blender": 0.3,  # (1.5kW * 0.2h)

            # Security and support systems
            "Security camera (CCTV)": 0.24,  # (10W * 24h)
            "Server": 24,  # (1kW * 24h)
            "UPS (Uninterruptible Power Supply)": 9,  # (3kW * 3h backup)
            "Smoke detector": 0.12,  # (5W * 24h)
            "Carbon monoxide detector": 0.12,  # (5W * 24h)
            "Alarm control panel": 0.72,  # (30W * 24h)
            "Electric vehicle charging station": 44,  # (22kW * 2h charge)

            # Storage areas
            "Electric forklift": 50,  # (10kW * 5h)
            "Automated mobile shelving": 6,  # (2kW * 3h)
            "Temperature sensor": 0.048,  # (2W * 24h)
            "Humidity sensor": 0.048,  # (2W * 24h)
            "Automatic door": 3,  # (750W * 4h intermittent use)

            # General areas
            "Industrial fan": 12,  # (1.5kW * 8h)
            "Space heater": 20,  # (2.5kW * 8h)
            "Electrical panel": 2.4,  # (300W * 8h)
            "Backup generator": 400,  # (100kW * 4h use)
            "Solar panel system": -20  # (-5kW * 4h generation)
        }

        electrical_equipment = list(electrical_equipment_kw.keys())

        type= random.choice(electrical_equipment)

        return{'Area': area[0], 'Company': area[1], 
               'Type':type,
               'Brand': random.choice(equipment_brands),
               'Installation_Date': self.fake.date_between(start_date="-1000d", end_date="today").strftime("%Y-%m-%d"),
               'Maintenance_Status': random.choice(maintenance_statuses),
               'Usage_Frequency': random.choice(usage_frequencies),
               'Model': self.fake.bothify(text="Model-####"),
               'CriticalEnergySystem': "Critical" if self.fake.boolean(chance_of_getting_true=30) else "No-Critical",
               'Estimated_Lifespan': random.randint(3, 20),
               'Nominal_Capacity': electrical_equipment_kw[type],
               'Energy_Efficiency': random.randint(50, 96),
               'Average_Daily_Consumption': daily_power_consumption_kw[type]
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
