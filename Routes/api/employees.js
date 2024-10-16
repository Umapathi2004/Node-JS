const express = require("express");
const router = express.Router();
const data = {
    element: require("../../employees.json"),
    setElement: function(Data) {
        this.element = Data ? Data : this.element;
    }
};

router.route("/")
    .get((req, res) => {
        res.status(200).json(data.element);
    })
    .post((req, res) => {
        const id = data.element.length ? data.element[data.element.length - 1].id + 1 : 1;
        const fullname = req.body.fullname;
        const age = req.body.age;
        const newElement = { id, fullname, age };
        const result = [...data.element, newElement];
        data.setElement(result); 
        res.status(201).json(result);
    })
    .put((req, res) => {
        const id = req.body.id;
        const fullname = req.body.fullname;
        const age = req.body.age;
        const result = data.element.map((item) => item.id == id ? { ...item, fullname, age } : item);
        data.setElement(result);
        res.status(200).json(data.element);
    })
    .delete((req, res) => {
        const id = req.body.id;
        const result = data.element.filter((item) => item.id != id);
        data.setElement(result);
        res.status(200).json(data.element);
    });

router.route("/:id")
    .get((req, res) => {
        const id = req.params.id;
        const result = data.element.filter((item) => item.id == id);
        result.length ? res.status(200).json(result) : res.status(404).json({ "message": `ID No:${id} Not Found!` });
    });

module.exports = router;
