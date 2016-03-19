
import AbstractRestClient from 'ima-plugin-rest-client/src/AbstractRestClient';
import HalsonConfigurator from './HalsonConfigurator';
import HalsonLinkGenerator from './HalsonLinkGenerator';
import HalsonResponsePostProcessor from './HalsonResponsePostProcessor';

export default class HalsonRestClient extends AbstractRestClient {
	constructor(httpAgent, apiRoot, linkMapResolvers, preProcessors = [],
			postProcessors = []) {
		super(
			httpAgent,
			new HalsonConfigurator(httpAgent, apiRoot, linkMapResolvers),
			new HalsonLinkGenerator(),
			preProcessors,
			[new HalsonResponsePostProcessor()].concat(postProcessors)
		);
	}

	list(resource, parameters = {}, options = {}) {
		return super.list(resource, parameters, options).then((response) => {
			return this._finalizeRequestResult(response);
		})
	}

	get(resource, id, parameters = {}, options = {}) {
		return super.get(
			resource,
			id,
			parameters,
			options
		).then((response) => {
			return this._finalizeRequestResult(response);
		});
	}

	patch(resource, id, data, options = {}) {
		return super.patch(resource, id, data, options).then((response) => {
			return this._finalizeRequestResult(response);
		});
	}

	replace(resource, id, data, options = {}) {
		return super.replace(resource, id, data, options).then((response) => {
			return this._finalizeRequestResult(response);
		});
	}

	create(resource, data, options = {}) {
		return super.replace(resource, data, options).then((response) => {
			return this._finalizeRequestResult(response);
		});
	}

	delete(resource, id, options = {}) {
		return super.delete(resource, id, options).then((response) => {
			return this._finalizeRequestResult(response);
		});
	}
	
	_finalizeRequestResult(response) {
		let resource = response.request.resource;
		if (resource.inlineResponseBody) {
			return response.body;
		}
		return response;
	}
}
