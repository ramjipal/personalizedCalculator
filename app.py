from flask import Flask, request, render_template, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class FormData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    value = db.Column(db.String(255))
    
@app.route('/')
def index():
    print("i am redirected")
    form_data = FormData.query.all()  # Fetch data from the database
    print(form_data)
    form_data_json = []  # Initialize an empty list

    for data in form_data:
        form_data_json.append({'name': data.name, 'value': data.value})

    return render_template('index.html', form_data=form_data_json)


@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.get_json()
    # Clear previous data in the FormData table
    db.session.query(FormData).delete()

    for key, value in data.items():
        form_data = FormData(name=key, value=value)
        db.session.add(form_data)
    
    db.session.commit()
    return jsonify({'message': 'Data saved successfully'})

@app.route("/delete", methods= ['POST'])
def delete_data():
    db.session.query(FormData).delete()
    db.session.commit()
    return redirect('/')

@app.route("/simplecal")
def simpleCalculator():
    return render_template("simplecal.html")

if __name__ == '__main__':
   with app.app_context():
        db.create_all()
        app.run(debug=True)
