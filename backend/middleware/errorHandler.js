const errorHandler = (error, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  console.log(error);

  if (error.name === 'SequelizeValidationError') {
    status = 400
    message = error.errors[0].message
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    status = 400
    message = error.errors[0].message
  }

  if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeForeignKeyConstraintError') {
    status = 400
    message = 'Invalid or wrong input (400)'
  }

  if (error.name === 'NotFound') {
    status = 404
    message = `Not found (404)`
  }

  res.status(status).json({
    message
  })
}

module.exports = errorHandler;