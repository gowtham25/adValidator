import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class HarFileServiceService {
	constructor() { }
	log:Object = {	entries: {}	};
	totals:Object = {};
	pads:Object = {};
	left;
	right;
	idctr:number = 0;
	reqCount:number = 0;
	totalReqSize:number = 0;
	totalRespSize:number = 0;
	requestObj:Object = {'resources':[]};
	responseFileData:any = {};
	render(har: any) {
    	var pageref;
		var that = this;
    	$.each(har.log.entries, function (index, entries) {
			// console.log(index, entries);
			var singleReqOb = {};
			that.requestObj['resources'].push(singleReqOb);
			pageref = pageref || entries.pageref;
			if(entries.pageref === pageref) {
				that.entry(index, entries);
			}
	    });
		this.responseFileData = this.requestObj;
		// console.log(this.responseFileData);
	}
	entry(id:any, entry:any) {
		id = id || this.idctr++;
		this.log['entries'][id] = entry;
    	var t = new Date(entry.startedDateTime).getTime();
    	if(this.left && this.right) {
    		this.left = (this.left < t) ? this.left : t;
    		this.right = (this.right > t) ? this.right : t;
    	}
    	else {
      		this.left = this.right = t;
    	}
    	if(entry.request) {
      		this.request(id, entry.request);
    	}
    	if(entry.response) {
    		this.response(id, entry.response);
    	}
	}
	request(id:any, request:any) {
		if(this.log['entries'][id]) {
			this.log['entries'][id].request = request;
		}
		else {
			this.log['entries'][id] = {
				id: id,
				request: request
			};
		}
		this._updateRequest(id, request);
		this.reqCount = this.reqCount + 1;
		if(request.headersSize && request.headersSize > 0) {
			this.totalReqSize = this.totalReqSize + request.headersSize;
		}
		if(request.bodySize && request.bodySize > 0) {
			this.totalReqSize = this.totalReqSize + request.bodySize;
		}
	}
	response(id:any, response:any) {
		if(this.log['entries'][id]) {
			this.log['entries'][id].response = response;
			this._updateResponse(id, response);

			if(response.headersSize && response.headersSize > 0) {
				this.totalRespSize = this.totalRespSize + response.headersSize;
			}
			if(response.bodySize && response.bodySize > 0) {
				this.totalRespSize = this.totalRespSize + response.bodySize;
			} 
		}
		else {
		}
	}
	 _updateRequest(id:any, request:any) {
		var reqObj = this.requestObj['resources'][id]; 
		if(request.url) {
			reqObj['filePath'] = request.url;
		}
	};
	_updateResponse(id:any, response:any) {
		var reqObj = this.requestObj['resources'][id];
		var type =  response.content.mimeType;
		var type_0 = type.split("/")[0];
		var type_1 = type.split("/")[1];
		switch (type_1) {
			case "javascript":
			case "x-javascript":
				reqObj['type'] = 'script';
				break;
			case "css":
			case "json":
			case "html":	
				reqObj['type'] = type_1;
				break;
			case "x-shockwave-flash":
				reqObj['type'] = 'flash';
				break;
			default:
				reqObj['type'] = type;
				break;
		}
		if(type_0 == 'image' || type_0 == 'video'){
			reqObj['type'] = type_0;
			reqObj['type'] = (reqObj['type'] == 'image') ? 'image' : reqObj['type'];
		}
		if(response.content && response.content.text) {   
			reqObj['size'] = response.bodySize;
		}else{
			reqObj['size'] = '';
		}
	}
}