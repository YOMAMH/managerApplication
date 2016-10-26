/**
 * Created by renminghe on 16-10-11.
 */
'use strict';
let mongoose = require('mongoose');
require('./contentCollection');
let ContentType = mongoose.model('ContentType');
let SortId = mongoose.model('SortId');

module.exports = {

    //获取总类目数据
    totalClass: (param)=> {
        let index = parseInt(param.index)||0;
        return ContentType.find().limit(1).skip(index).then(function (data) {
            if (!data) throw new Error('信息不存在！');
            return data;
        }).catch(function (err) {
            throw err;
        })
    },

    //获取总条数
    totalClassCount: ()=>ContentType.count().then(function (count) {
        if (!count) throw new Error('信息不存在！');
        return {count: count};
    }).catch(function (err) {
        throw err;
    }),

    //增加sortId记录
    addSortId: (parame)=> {
        console.log(parame.number);
       if(!parame.number[1]){
           let SortIdSchema = new SortId({number: item});
           return SortIdSchema.save(function (err) {
               if (err) throw Error('存储失败！');
           }).then(function () {
               return {info: 'success'}
           }).catch(function (err) {
               throw err;
           });
       }else {
           return Array.from(parame.number).forEach(function (item) {
               let SortIdSchema = new SortId({number: item});
               return SortIdSchema.save(function (err) {
                   if (err) throw Error('存储失败！');
               }).then(function () {
                   return {info: 'success'}
               }).catch(function (err) {
                   throw err;
               });
           });
       }
    },

    //检查sortId记录
    checkSortId: (parame)=> {
        let sortId = parseInt(parame.number);
        return SortId.find({number: sortId}).then(function (data) {
            if (!data) throw Error('查询错误');
            return data;
        }).catch(function (err) {
            throw err;
        })
    },
    //检查一级类目
    checkOneClass: (parame)=>ContentType.find({name: parame.oneClass}).then(function (data) {
        if (!data) throw Error('查询错误');
        return data;
    }).catch(function (err) {
        throw err;
    }),

    //更新类目
    upDataClass: (parame)=> {
        let oneClass = parame.oneClass;
        let twoClass = parame.twoClass;
        let threeClass = Array.from(parame.threeClass);
        let oneSortId = parseInt(parame.oneSortId);
        let twoSortId = parseInt(parame.twoSortId);
        let threeSortId = Array.from(parame.threeSortId);
        let threeObjArr = [];
        let type = parame.type;

        (function () {
            let i = 0;
            for (i; i < threeClass.length; i++) {
                threeObjArr.push({name: threeClass[i], sortId: parseInt(threeSortId[i]), type: '1'});
            }
            return threeObjArr;
        }());
        //push二级类目
        return ContentType.update({name: oneClass}, {
            $push: {
                typeTwo: {
                    name: twoClass,
                    sortId: twoSortId,
                    type: '1'
                }
            }
        }).then(function (data) {
            if (!data) throw Error('更新错误');

            //push三级类目
            return ContentType.update({name: parame.oneClass, 'typeTwo.name': twoClass}, {
                $push: {
                    'typeTwo.$.typeThree': {$each: threeObjArr}
                }
            }).then(function (data) {
                if (!data) throw Error('更新错误');
                return {info: 'success'};
            }).catch(function (err) {
                throw err;
            });
        }).catch(function (err) {
            throw err;
        });

    },

    //创建一级类目
    createOneClass: (parame)=> {
        let oneClass = parame.oneClass;
        let oneSortId = parame.oneSortId;
        let oneClassModel = new ContentType({
            name: oneClass,
            sortId: oneSortId,
            type: '1'
        });
        return oneClassModel.save(function (err) {
            if (err) throw Error('存储失败！');
        }).then(function () {
            return updataTwoClass(parame);
        }).catch(function (err) {
            throw err;
        });
    },

    //创建三级类目
    updateThreeClass: (parame)=> {
        let oneClass = parame.oneClass;
        let twoClass = parame.twoClass;
        let threeClass = parame.threeClass;
        let threeSortId = parame.threeSortId;

        //push三级类目
        return ContentType.update({name: oneClass, 'typeTwo.name': twoClass}, {
            $push: {
                'typeTwo.$.typeThree': {name: threeClass, sortId: threeSortId, type: '1'}
            }
        }).then(function (data) {
            if (!data) throw Error('更新错误');
            return {info: 'success'};
        }).catch(function (err) {
            throw err;
        });
    },

    //更新类目
    updateCategory: (parame)=> {
        if(parame.category == '1'){  //更新一级类目
            if(parame.type) {
                return ContentType.update({name: parame.oneClass}, {$set: {type: parame.type}}).then(function (data) {
                    if (!data) throw Error('更新错误');
                    return {info: 'success'};
                }).catch(function (err) {
                    throw err;
                });
            }else {
                return ContentType.update({name: parame.originallyName}, {$set: {name: parame.oneClass}}).then(function (data) {
                    if (!data) throw Error('更新错误');
                    return {info: 'success'};
                }).catch(function (err) {
                    throw err;
                });
            }
        }else if(parame.category == '2') { //更新二级类目
            if(parame.type){
                return ContentType.update({name: parame.oneClass, 'typeTwo.name': parame.twoClass},
                    {$set: {'typeTwo.$.type': parame.type}}).then(function (data) {
                    if (!data) throw Error('更新错误');
                    return {info: 'success'};
                }).catch(function (err) {
                    throw err;
                });
            }else {
                return ContentType.update({name: parame.oneClass,'typeTwo.name':parame.originallyName},
                    {$set: {'typeTwo.$.name': parame.twoClass}}).then(function (data) {
                    if (!data) throw Error('更新错误');
                    return {info: 'success'};
                }).catch(function (err) {
                    throw err;
                });
            }

        }else {
            let arrTemp = [];
            (function () {
                let i = 0;
                for (i;i<parame.threeClass.length;i++){
                    arrTemp.push({
                        name:parame.threeClass[i].name,
                        sortId:parame.threeClass[i].sortId,
                        type:parame.threeClass[i].type
                    });
                }
                return arrTemp;
            }());

            return ContentType.update({name: parame.oneClass, 'typeTwo.name': parame.twoClass},
                {$set: {'typeTwo.$.typeThree': arrTemp}}).then(function (data) {
                if (!data) throw Error('更新错误');
                return {info: 'success'};
            }).catch(function (err) {
                throw err;
            });

        }
    },

    //删除类目信息
    deleteCategory:(parame)=>{
        if(parame.type == '2'){  //删除二级类目
          //删除对应的二级类目的所有键
          return ContentType.update({name:parame.oneClass,'typeTwo.name':parame.twoClass},{$unset:{
              'typeTwo.$.name':'',
              'typeTwo.$.sortId':'',
              'typeTwo.$.type':'',
              'typeTwo.$._id':'',
              'typeTwo.$.typeThree':''
          }}).
              then(function () {
              let twoClassArr = [];

              //查找对应的一级类目内的所有二级类目，找出内容为空数组的二级类目
              return ContentType.find({name:parame.oneClass}).then(function (data) {
                  (function () {
                      let i = 0;
                      for (i;i<data[0].typeTwo.length;i++){
                          if(data[0].typeTwo[i].typeThree[0]){  //将不为空的二级类目重新push到一个新的数组内
                              twoClassArr.push(data[0].typeTwo[i]);
                          }
                      }
                      return twoClassArr;
                  }());
                  console.log(twoClassArr);

                  //再次更新该一级类目内的所有二级类目
                  return ContentType.update({name:parame.oneClass},{typeTwo:twoClassArr}).then(function () {
                      if (!data) throw Error('更新错误');
                      return {info: 'success'};
                  }).catch(function (err) {
                      throw err;
                  });
              }).catch(function (err) {
                  throw err;
              });
          }).catch(function (err) {
              throw err;
          });

        }else {   //删除一级类目
            return ContentType.remove({name:parame.oneClass}).then(function (data) {
                if (!data) throw Error('更新错误');
                return {info: 'success'};
            }).catch(function (err) {
                throw err;
            })
        }
    },

    //删除sortId
    deleateSortId:(parame)=>{

       return Array.from(parame.sortId).forEach(function (item) {
            return SortId.remove({number:item}).then(function (data) {
                if (!data) throw Error('更新错误');
                return {info: 'success'};
            }).catch(function (err) {
                throw err;
            })
        });
    }
};
