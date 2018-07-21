import React, { Component, Fragment } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

class Form extends Component {
	componentDidMount() {
		document.title = "Form";
	}
	render() {
		return (
			<Fragment>
				<Formik
					validationSchema={Yup.object().shape({
						email: Yup.string().email('Invalid email address').required('Email is required!')
					})}
					initialValues={{
						email: 'diogo@diogocezar.com',
					}}
					onSubmit={(values, actions) => {
						const url = 'http://localhost/dctb-wp-react-boilerplate/public/api/wp-admin/admin-ajax.php?action=send_contact'
						axios.post(
							url,
							values,
							{ headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
						)
						.then((response) =>{
							actions.setSubmitting(false)
							console.log(response)
						})
					}}
					render={({ values, touched, errors, dirty, isSubmitting, handleSubmit, handleChange, handleBlur, handleReset  }) => (
						<form onSubmit={handleSubmit}>
							<label htmlFor="email" style={{ display: 'block' }}>Email</label>
							<input
								id="email"
								placeholder="Enter your email"
								type="text"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className={errors.email && touched.email ? 'text-input error' : 'text-input'}
							/>
							{errors.email &&
							touched.email && <div className="input-feedback">{errors.email}</div>}
							<button
								type="button"
								className="outline"
								onClick={handleReset}
								disabled={!dirty || isSubmitting}
							>
								Reset
							</button>
							<button type="submit" disabled={isSubmitting}>
								Submit
							</button>
						</form>
					)}
				/>
			</Fragment>
		)
	}
}

export default Form