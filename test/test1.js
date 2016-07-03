import test from 'ava';
import path from 'path';
import execmd from '../bin/execmd.js'

test('rev_merge_test', async (x) => {
	let argu={
    	_:['mod1','mod2','mod3'],
    	t:'target'
    };
    console.log(argu);
    let result=execmd(argu);
    x.is(result.targetfile,path.resolve('target','package.json'));
    x.is(result.pkgobj.dependencies.mod3,"^9.9.9");
});