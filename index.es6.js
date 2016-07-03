#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
var argv = require('yargs').argv;

//console.log(argv);
function completePath(spath){
	spath=spath||"";
	let state=fs.lstatSync(spath);
	if(state.isDirectory()){
		spath=path.resolve(spath,'package.json')
	}
	return spath;
}
let targetfile=completePath(argv.t);

let pkgobj;
try{
		let data=fs.readFileSync(targetfile, 'utf8');
		pkgobj=JSON.parse(data);
		console.log(`Reading from target file : ${targetfile}`);
		pkgobj.dependencies=pkgobj.dependencies||{};
		pkgobj.devDependencies=pkgobj.devDependencies||{};
}catch(err){
		 pkgobj={
			  "name": "Generated by merge-package",
			  "version": "0.0.1",
			  "description": "Generated by merge-package",
			  "dependencies": {},
			  "devDependencies": {}
			 };
}

//console.log(JSON.stringify(pkgobj,null,4));
function getDepObj(depobj,data){
   Object.keys(data).forEach(d=>{
		  	let revstr=data[d];
		  	if(depobj[d]){
		  		let oldrev=Number(depobj[d].substr(1));
		  		let rev=Number(revstr.substr(1));
		  		if(oldrev>rev){
		  			revstr=depobj[d];
		  		}
		  	}
		  	depobj[d]=revstr;
		  	
	});

	 return depobj;
}

argv._.forEach(x=>
	{
		let spath=x;
			spath=completePath(spath);
		try{
			let data=fs.readFileSync(spath, 'utf8');
			console.log(`Reading from source file : ${spath}`);
			data=JSON.parse(data);
			getDepObj(pkgobj.dependencies,data.dependencies);
			getDepObj(pkgobj.devDependencies,data.devDependencies);
		}
		catch(err){
			console.log(err);
		}
	}
);
//console.log(pkgobj.devDependencies)
try{
	fs.writeFileSync(targetfile,JSON.stringify(pkgobj,null,4));
	console.log(`Merged to ${targetfile}!`);
}
catch(err){
	console.log(err);
}




