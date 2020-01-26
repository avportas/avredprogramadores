import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
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

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

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
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Editar tu perfil</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Añade información de tu carrera profesional
      </p>
      <small>* = campo requerido</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option>* Estatus profesional</option>
            <option value='Desarrollador Junior'>Desarrollador Junior</option>
            <option value='Desarrollador Senior'>Desarrollador Senior</option>
            <option value='Manager'>Manager</option>
            <option value='Estudiante'>Estudiante</option>
            <option value='Instructor'>Instructor o profesor</option>
            <option value='En prácticas'>En prácticas</option>
            <option value='Otro'>Otro</option>
          </select>
          <small className='form-text'>
          NIVEL PROFESIONAL. ¿Qué cargo ocupas u ocupaste en tu último empleo?
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
           TU EMPRESA. Puede ser una propia o en la que hayas trabajado
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
           TU PÁGINA WEB. Puede ser una propia o en la que hayas trabajado
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
           LOCALIZACIÓN. Ciudad o provincia
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
            CONOCIMIENTOS. Usa una coma para separarlos (ej: HTML,CSS,JavaScript,PHP)
          </small>
        </div>


        {/*
        <div className='form-group'>
          <input
            type='text'
            placeholder='Cuenta Github'
            name='githubusername'
            value={githubusername}
            onChange={e => onChange(e)}
          />

          <small className='form-text'>
           CUENTA GITHUB. Si quieres mostrar tu repositorio 
          </small>
        </div>
      */}

        <div className='form-group'>
          <textarea
            placeholder='Biografía'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>BIOGRAFÍA. Cuéntanos sobre tu vida</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
           Añade tus redes sociales
          </button>
          <span>(opcional)</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter '
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
                placeholder='Instagram '
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <Link className='btn btn-light my-1' to='/dashboard'>
          Regresar
        </Link>
        <input type='submit' className='btn btn-primary my-1' />
      
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
