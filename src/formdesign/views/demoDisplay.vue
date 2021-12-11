<template>
  <div class="form-display-panel">
		<form-display :form-config="formConfig" v-model="formData">
			<SignSeal slot="signseal" slot-scope="props" v-bind="props"/>
			<HeadPhoto slot="headPhoto" slot-scope="props" v-bind="props"/>
		</form-display>
	</div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';

import FormDisplay from "./FormDisplay";
import SignSeal from './SignSeal'
import HeadPhoto from './HeadPhoto'

import { initDataProps } from "./common.js";

let config = [
	{ type: 'titleBar', code: 'baseinfo', name: '基本信息' },
	{
		type: 'colLayout',
		children: [
			{ 
				span: 18, 
				components: [
					{ 
						type: 'colLayout', 
						children: [
							{ span: 8, components: [{ type: 'inputText', code: 'username', name: '姓名', required: true }]},
							{ span: 8, components: [{ type: 'selectDict', code: 'sex', name: '性别', required: true, dict: 'usermanage.user.sex' }]},
							{ span: 8, components: [{ type: 'selectDict', code: 'nation', name: '民族', required: true, dict: 'usermanage.user.nation' }]},
						]
					},
					{ 
						type: 'colLayout', 
						children: [
							{ span: 12, components: [{ type: 'inputText', code: 'idcard', name: '身份证号', required: true }]},
							{ span: 12, components: [{ type: 'inputText', code: 'worktime', name: '参加工作时间', required: true }]},
						]
					},
					{ 
						type: 'colLayout', 
						children: [
							{ span: 24, components: [{ type: 'inputText', code: 'address', name: '家庭住址', required: true }]},
						]
					}
				]
			},
			{ span: 6, components: [{ type: 'headPhoto', code: 'headphoto', name: '头像'}]}
		]
	},
	{ type: 'inputText', code: 'a', name: 'a' },
	{ type: 'inputText', code: 'b', name: 'b' },
	{ type: 'inputText', code: 'c', name: 'c' },
	{ type: 'inputText', code: 'd', name: 'd' },
	{ type: 'inputText', code: 'e', name: 'e' },
	{ type: 'titleBar', code: 'workinfo', name: '工作信息' },
	{
		type: 'colLayout',
		children: [
			{
				span: 12,
				components: [
					{ type: 'inputText', code: 'org.name', name: '编制所在单位', required: true, disabled: true },
					{ type: 'signseal', code: 'signseal', name: '盖章', float: {
						left: 1, top: 0.05, //0-1
						pos: {left: -100, right: 0, top: 0, bottom: 0}
					}}
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: 'complietype', name: '编制类型', required: true, dict: 'usermanage.user.complietype' }
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: 'identitytype', name: '本人身份', required: true, dict: 'usermanage.user.identitytype', filter: [1,2]}
				]
			}
		]
	},
	{ type: 'inputText', code: 'a1', name: 'a1' },
	{ type: 'inputText', code: 'b1', name: 'b1' },
	{ type: 'inputText', code: 'c1', name: 'c1' },
	{ type: 'inputText', code: 'd1', name: 'd1' },
	{ type: 'inputText', code: 'e1', name: 'e1' },
	{ type: 'titleBar', code: 'jobinfo', name: '岗位信息' },
	{
		type: 'colLayout',
		children: [
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: "job.jobtype", name: "岗位类型", dict: "usermanage.user.jobtype" },
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: "job.joblevel", name: "岗位等级",  dict: "usermanage.user.joblevel"},
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'inputText', code: "job.hiretime", name: "现聘岗位等级时间"},
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'inputText', code: "position", name: "编制职务名称", show: (data) => {
						return get(data, 'job.jobtype') == 1;
					}},
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: "posttitle", name: "现有专技资格名称", dict: "usermanage.user.posttitle" },
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: "technicalgrade", name: "技术等级", dict: "usermanage.user.technicalgrade" },
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'inputText', code: "occupation", name: "职业（工种）"},   
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'inputBool', code: "mpwork", name: "是否双肩挑", show: (data) => {
						return get(data, 'job.jobtype') == 1;
					}},
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'inputBool', code: "job.isoccupynum",name: "是否占用指标", show: (data) => {
						return get(data, 'job.jobtype') == 1;
					}},
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: "job2.joblevel2", name: "双肩挑岗位等级", dict: "usermanage.user.joblevel", show: (data) => {
						return get(data, 'job.jobtype') == 1 && get(data, 'mpwork');
					} },
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'selectDict', code: "hireposttitle", name: "现聘专技资格名称", dict: "usermanage.user.posttitle" },
				]
			},
			{ 
				span: 6, 
				components: [
					{ type: 'inputText', code: "job2.hiretime2", name: "现聘双肩挑等级时间", show: (data) => {
						return get(data, 'job.jobtype') == 1 && get(data, 'mpwork');
					}},
				]
			},
		]
	},
	{ type: 'inputText', code: 'a2', name: 'a2' },
	{ type: 'inputText', code: 'b2', name: 'b2' },
	{ type: 'inputText', code: 'c2', name: 'c2' },
	{ type: 'inputText', code: 'd2', name: 'd2' },
	{ type: 'inputText', code: 'e2', name: 'e2' },
	{ type: 'inputText', code: 'f2', name: 'f2' },
	{ type: 'inputText', code: 'g2', name: 'g2' },
]

export default {
	components: {
		FormDisplay,
		SignSeal,
		HeadPhoto
	},
	data(){
		return {
			formData: initDataProps({}, config),
			formConfig: config
		}
	}
}
</script>
<style lang="less" scoped>
.form-display-panel{
	height: 100%;
	padding: @layout-space-base;
}
</style>