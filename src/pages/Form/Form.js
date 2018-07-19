import React, { Component, Fragment } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';

//Plugins
import { PluginMouseWheel } from '../../plugins/plugin-mouse-wheel'
import { PluginNiceScroll } from '../../plugins/plugin-nice-scroll'

class Form extends Component {
	constructor() {
		super()
	}
	componentDidMount() {
		this.pluginNiceScroll = new PluginNiceScroll()
		this.pluginMouseWheel = new PluginMouseWheel()
		document.title        = "Form";
	}
	render() {
		return (
			<Fragment>
				<Formik
					validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Invalid email address')
      					.required('Email is required!'),
					})}
					initialValues={{
						email: 'diogo@diogocezar.com',
					}}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							console.log(JSON.stringify(values, null, 2))
							actions.setSubmitting(false)
						}, 1000)
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