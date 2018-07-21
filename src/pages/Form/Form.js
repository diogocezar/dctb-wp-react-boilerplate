import React, { Component, Fragment } from 'react'
import { Formik }                     from 'formik'
import * as Yup                       from 'yup'
import axios                          from 'axios'

class Form extends Component {
	constructor(props){
		super(props)
		this.state = {
			endpoint : 'http://localhost/dctb-wp-react-boilerplate/public/api/wp-admin/admin-ajax.php?action=send_contact',
			success  : null
		}
	}
	componentDidMount() {
		document.title = "Form";
	}
	sendForm = (values, actions) =>{
		axios.post(this.state.endpoint,	values, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
		.then((response) => {
			actions.setSubmitting(false)
			this.setState({ success : true })
		})
		.catch((error) =>{
			actions.setSubmitting(false);
			this.setState({ success: false })
		})
	}
	validation = () => {
		return Yup.object().shape({
			email: Yup.string().email('Invalid email address').required('Email is required!')
		})
	}
	render() {
		return (
			<Fragment>
				<Formik
					validationSchema = { this.validation() }
					initialValues    = {{email: 'diogo@diogocezar.com'}}
					onSubmit         = {(values, actions) => { this.sendForm(values, actions)}}
					render           = {({ values, touched, errors, dirty, isSubmitting, handleSubmit, handleChange, handleBlur, handleReset }) => (
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
							{errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
							<br/>
							{this.state.success && this.state.success === true && <h1>Success</h1>}
							{this.state.success && this.state.success === false && <h1>Error</h1>}
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