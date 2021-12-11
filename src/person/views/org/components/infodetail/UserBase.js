export default {
  list: [
    {
      type: 'titleBar',
      code: 'job',
      name: '岗位信息'
    },
    {
      type: 'colLayout',
      children: [
        {
          span: 8,
          components: [
            {
              name: '岗位类型',
              code: 'job.jobtype',
              type: 'selectDict',
              dict: 'usermanage.user.jobtype',
              disabled: true
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '岗位等级',
              code: 'job.joblevel',
              type: 'selectDict',
              dict: 'usermanage.user.joblevel',
              disabled: true
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '现聘岗位等级时间',
              code: 'job.hiretime',
              type: 'datePicker',
              disabled: true
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '编制职务名称',
              code: 'position',
              type: 'inputText',
              disabled: true,
              relation: [{ code: 'job.jobtype', value: 1 }]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '现有专技资格名称',
              code: 'posttitle',
              type: 'selectDict',
              dict: 'usermanage.user.posttitle',
              relation: [{ code: 'job.jobtype', value: [1, 2], op: 'arr' }]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '技术等级',
              code: 'technicalgrade',
              type: 'selectDict',
              dict: 'usermanage.user.technicalgrade',
              disabled: true,
              relation: [{ code: 'job.jobtype', value: 3 }]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '职业（工种）',
              code: 'occupation',
              type: 'inputText',
              relation: [{ code: 'job.jobtype', value: 3 }]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '是否双肩挑',
              code: 'mpwork',
              type: 'inputBool',
              disabled: true,
              relation: [
                { code: 'job.jobtype', value: 1 },
                {
                  code: 'job.joblevel',
                  value: [101, 102, 103, 104, 105, 107],
                  op: 'arr'
                }
              ]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '是否占用指标',
              code: 'job.isoccupynum',
              type: 'inputBool',
              disabled: true,
              relation: [
                { code: 'job.jobtype', value: 1 },
                { code: 'job.joblevel', value: [106, 108], op: 'arr' }
              ]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '双肩挑岗位等级',
              code: 'job2.joblevel2',
              type: 'selectDict',
              dict: 'usermanage.user.joblevel',
              disabled: true,
              relation: [
                { code: 'job.jobtype', value: 1 },
                {
                  code: 'job.joblevel',
                  value: [101, 102, 103, 104, 105, 107],
                  op: 'arr'
                },
                { code: 'mpwork', value: true }
              ]
            }
          ]
        },
        // TODO 用于管理岗位 (后期应该只配置一个，将这两个的relation合并)
        {
          span: 8,
          components: [
            {
              name: '现聘专技资格名称',
              code: 'hireposttitle',
              type: 'selectDict',
              dict: 'usermanage.user.posttitle',
              disabled: true,
              relation: [
                { code: 'job.jobtype', value: 1 },
                {
                  code: 'job.joblevel',
                  value: [101, 102, 103, 104, 105, 107],
                  op: 'arr'
                },
                { code: 'mpwork', value: true }
              ]
            }
          ]
        },
        // TODO 用于 专业技术岗位
        {
          span: 8,
          components: [
            {
              name: '现聘专技资格名称',
              code: 'hireposttitle',
              type: 'selectDict',
              dict: 'usermanage.user.posttitle',
              disabled: true,
              relation: [{ code: 'job.jobtype', value: 2 }]
            }
          ]
        },
        {
          span: 8,
          components: [
            {
              name: '现聘双肩挑等级时间',
              code: 'job2.hiretime2',
              type: 'datePicker',
              disabled: true,
              relation: [
                { code: 'job.jobtype', value: 1 },
                {
                  code: 'job.joblevel',
                  value: [101, 102, 103, 104, 105, 107],
                  op: 'arr'
                },
                { code: 'mpwork', value: true }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'titleBar',
      code: 'partwork',
      name: '兼职、顶岗、挂职信息'
    },
    {
      label: '工作所在单位',
      code: 'workorg.name',
      type: 'text',
      span: 2,
      disable: true
    },
    {
      label: '工作职务名称',
      code: 'workposition',
      type: 'text',
      span: 1,
      disable: true
    },
    {
      type: 'formGroup',
      code: 'work',
      label: '兼职、顶岗、挂职信息',
      disabled: true,
      properties: [
        {
          name: '工作所在单位',
          code: 'workorg.name',
          type: 'inputText',
          disabled: true,
          span: 16
        },
        {
          name: '工作职务名称',
          code: 'workposition',
          type: 'inputText',
          disabled: true,
          span: 8
        }
      ]
    }
  ]
}
