from datetime import datetime
from math import ceil

from db.models.Bill import BillModel

def calculate(company):
    return (company.Reading - company.Last_Reading)*(100 + company.Extra_Percent)//100 + company.Increase

def over_limit(company):
    return max(0, company.Reading - company.Limit)

def liquidate_bill(db, company, date=None):
    """
    Given a company, liquidate its bill.
    """
    over = over_limit(company)
    cost = calculate(company)

    company.Last_Reading = company.Reading
    db.commit()

    bill = BillModel(
        company=company,
        BillDate=date or datetime.today(),
        Reading=company.Reading,
        OverLimit=over,
        Cost=cost,
    )

    db.add(bill)

    return bill

def _get(db, Obj, /, **kwargs):
    """Low level GET implementation"""
    query = db.query(Obj)
    for k, v in kwargs.items():
        query = query.filter(getattr(Obj, k) == v)

    return query

def total_consumption(db, company, start_date, end_date):
    # select * between start_date and end_date
    start = _get(db, BillModel, BillDate=start_date, CompanyID=company.id).one()
    end = _get(db, BillModel, BillDate=end_date, CompanyID=company.id).one()

    return end.Reading - start.Reading

def average_consumption(db, company, start_date, end_date):
    """
    Monthly consumption.
    """
    months = ceil(((end_date - start_date).days + 1) / 30)
    return total_consumption(db, company, start_date, end_date)/months

def over_consumption(db, start_date, end_date):
    # select company, over_limit where over_limit > 0
    return _get(db, BillModel).filter(BillModel.OverLimit > 0).all()

def predict_consumption(db, company, start_date, end_date):
    # :^)
    return average_consumption(db, company, start_date, end_date)

def compare_consumption(db, start_date, end_date):
    """
    a frecuencia de uso (>every time one uses an item they must register it manually wtf)
    """
    return _get(db, BillModel).filter(BillModel.BillDate >= start_date).filter(BillModel.BillDate <= end_date).all()
