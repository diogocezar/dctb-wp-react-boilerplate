import React, { Component, Fragment } from 'react'
import { Formik }                     from 'formik'
import * as Yup                       from 'yup'
import axios                          from 'axios'
import { ajax }                       from '../../config'

class Form extends Component {
	constructor(props){
		super(props)
		this.state = {
			endpoint : `${ajax['form']}`,
			success  : null
		}
	}
	componentDidMount() {
		document.title = "Form";
	}
	sendForm = (values, actions) =>{
		let data = new FormData()
		let file = document.querySelector('#file')
		data.append('file', file.files[0])
		data.append('email', values.email)
		// 'Content-type': 'application/x-www-form-urlencoded'
		axios.post(this.state.endpoint, data, { headers: { 'Content-Type': 'multipart/form-data' }})
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
					validationSchema = {this.validation()}
					initialValues    = {{email: 'diogo@diogocezar.com', file: ''}}
					onSubmit         = {(values, actions) => { this.sendForm(values, actions)}}
					render           = {({ values, touched, errors, dirty, isSubmitting, handleSubmit, handleChange, handleBlur, handleReset }) => (
						<form onSubmit={handleSubmit} encType="multipart/form-data">
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
							<input
								id="file"
								type="file"
								value={values.file}
								onChange={handleChange}
								onBlur={handleBlur}
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