import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({
	createProfile,
	getCurrentProfile,
	profile: { profile, loading },
	history
}) => {
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: ''
	});
	const [displaySocialInputs, toggleSocialInputs] = useState(false);
	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
	};
	useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getCurrentProfile]);
	return loading && profile === null ? (
		<Redirect to='/dashboard' />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Crear perfil</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Añade información de tu carrera profesional
			</p>
			<small>* = campo requerido</small>
			<form className='form' onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<select name='status' value={status} onChange={e => onChange(e)}>
						<option value='0'>* Estatus profesional</option>
						
						<option value='Desarrollador Junior'>Desarrollador Junior</option>
						<option value='Desarrollador Senior'>Desarrollador Senior</option>
						<option value='Manager'>Manager</option>
						<option value='Estudiante'>Estudiante</option>
						<option value='Instructor'>Instructor o profesor</option>
						<option value='En prácticas'>En prácticas</option>
						<option value='Otro'>Otro</option>
					</select>
					<small className='form-text'>
						¿Qué cargo ocupas?
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Empresa'
						name='company'
						value={company}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Puede ser una propia o en la que hayas trabajado
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Página web'
						name='website'
						value={website}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Puede ser propia o en la que hayas trabajado
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Localización'
						name='location'
						value={location}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Ciudad o provincia
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Conocimientos'
						name='skills'
						value={skills}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Usa una coma para separarlos (ej: HTML,CSS,JavaScript,PHP)
					</small>
				</div>


				<div className='form-group'>
					<textarea
						placeholder='Biografía'
						name='bio'
						value={bio}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>Cuéntanos sobre tu vida</small>
				</div>

				<div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Añade tus redes sociales (url completa)
					</button>
					<span>(opcional)</span>
				</div>
				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter'
								name='twitter'
								value={twitter}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook '
								name='facebook'
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x' />
							<input
								type='text'
								placeholder='YouTube '
								name='youtube'
								value={youtube}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin '
								name='linkedin'
								value={linkedin}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</div>
					</Fragment>
				)}

				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Regresar
				</Link>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(CreateProfile)
);
