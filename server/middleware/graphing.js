'use strict'

const hotShotsGrapher = (grapher) => {
  const genReqId = reqIdGenFactory()

  graphingMiddleware.grapher = grapher
  return graphingMiddleware

  function onResFinished () {
    this.removeListener('finish', onResFinished)
    this.removeListener('error', onResFinished)

    const graph = this.graph

    const responseTime = Date.now() - this.startTime
    graph.timing('.response_time', responseTime)

    if (this.statusCode > 199 && this.statusCode < 300) {
      graph.increment('.hits.2XX')
    }

    if (this.statusCode > 399 && this.statusCode < 500) {
      graph.increment('.errors.4XX')
    }

    if (this.statusCode > 499 && this.statusCode < 600) {
      graph.increment('.errors.5XX')
    }

    graph.close()
  }

  function onReqAborted () {
    const res = this.res
    res.statusCode = 408
    onResFinished.call(res, new Error('Aborted'))
  }

  function graphingMiddleware (req, res, next) {
    req.id = genReqId(req)

    req.graph = res.graph = grapher
    res.on('finish', onResFinished)
    res.on('error', onResFinished)
    req.on('aborted', onReqAborted)

    if (next) { next() }
  }
}

module.exports = hotShotsGrapher

const reqIdGenFactory = () => {
  const maxInt = 2147483647
  let nextReqId = 0

  return (req) => req.id || (nextReqId = (nextReqId + 1) & maxInt)
}
