const{Account, Province, District, Ward, Village} = require('../models');

const getListProvince = async (req, res) => {
    try {
        const listProvince = await Province.findAll({});
        if(listProvince){
            res.send({messsage:"thành công", listProvince});
        }else{
            res.send({messsage:"thất bại"});
        }
    } catch (error) {
        res.send({messsage:error});
    }
}

const getListDistrict = async (req, res) => {
    const {code} = req.body;
    try {
        const listDistrict = await District.findAll({
            where:{
                province_code:code
            }
        });
        if(listDistrict){
            res.send({messsage:"thành công", listDistrict});
        }else{
            res.send({messsage:"thất bại"});
        }
    } catch (error) {
        res.send({messsage:error});
    }
}

const getListWard = async (req, res) =>{
    const {code} = req.body;
    try {
        const listWard = await Ward.findAll({
            where:{
                district_code:code
            }
        });
        if(listWard){
            res.send({messsage:"thành công", listWard});
        }else{
            res.send({messsage:"thất bại"});
        }
    } catch (error) {
        res.send({messsage:error});
    }
}

const getListVillage = async (req, res) => {
    const {code} = req.body;
    try {
        const listVillage = await Village.findAll({
            where:{
                ward_code:code
            }
        });
        if(listVillage){
            res.send({messsage:"thành công", listVillage});
        }else{
            res.send({messsage:"thất bại"});
        }
    } catch (error) {
        res.send({messsage:error});
    }
}

const createAddress = async (req, res) => {
    const {code, name} = req.body;
    try {
        if (req.account.role_id == 1){
            const newProvince = Province.create({name, code});
            if (newProvince) {
                res.send({messsage:"tạo tỉnh thành công", newProvince})
            }else{
                res.send({messsage:"tạo thất bại"})
            }
        };
        if (req.account.role_id == 2){
            const province_code = req.account.username;
            const newDistrict = District.create({name, code, province_code});
            if (newDistrict) {
                res.send({messsage:"tạo tỉnh thành công", newDistrict})
            }else{
                res.send({messsage:"tạo thất bại"})
            }
        };
        if (req.account.role_id == 3){
            const district_code = req.account.username;
            const newWard = Ward.create({name, code, district_code});
            if (newWard) {
                res.send({messsage:"tạo tỉnh thành công", newWard})
            }else{
                res.send({messsage:"tạo thất bại"})
            }
        };
        if (req.account.role_id == 4){
            const ward_code = req.account.username;
            const newVillage = Village.create({name, code, ward_code});
            if (newVillage) {
                res.send({messsage:"tạo tỉnh thành công", newVillage})
            }else{
                res.send({messsage:"tạo thất bại"})
            }
        };
    } catch (error) {
        res.send({messsage:error});
    }
}

module.exports = {
    getListProvince,
    getListDistrict,
    getListWard,
    getListVillage,
    createAddress
}