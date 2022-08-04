const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all parties
router
    .route('/parties')
    .get((req, res) => {
        const sql = `SELECT * FROM parties`;

        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'Success!',
                data: rows
            });
        });
    });

//get single party
router
    .route('/party/:id')
    .get((req, res) => {
        const sql = `SELECT * FROM parties WHERE id = ?`;
        const params = [req.params.id];

        db.query(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'Success!',
                data: row
            });
        });
    });

//Delete a party
router
    .route('/party/:id')
    .delete((req, res) => {
        const sql = `DELETE FROM parties WHERE id = ?`;
        const params = [req.params.id];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Party not found!'
                });
            } else {
                res.json({
                    message: 'Success!',
                    changes: result.affectedRows,
                    id: req.params.id
                });
            }
        });
    });

module.exports = router;