import { Database } from 'bun:sqlite'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

let _db = null

function getDB() {
    if (_db) return _db

    const DB_PATH = process.env.DB_PATH || './data/auth.db'
    mkdirSync(path.dirname(DB_PATH), { recursive: true })

    _db = new Database(DB_PATH, { create: true })
    _db.run('PRAGMA journal_mode = WAL')
    _db.run('PRAGMA foreign_keys = ON')

    _db.run(`
        CREATE TABLE IF NOT EXISTS user_ips (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id    TEXT    NOT NULL,
            ip         TEXT    NOT NULL,
            created_at INTEGER NOT NULL DEFAULT (unixepoch())
        )
    `)
    _db.run(`
        CREATE INDEX IF NOT EXISTS idx_user_ips_user_id ON user_ips(user_id)
    `)
    _db.run(`
        CREATE TABLE IF NOT EXISTS ip_rules (
            user_ip_id  INTEGER NOT NULL,
            resource_id TEXT    NOT NULL,
            rule_id     TEXT    NOT NULL,
            PRIMARY KEY (user_ip_id, resource_id),
            FOREIGN KEY (user_ip_id) REFERENCES user_ips(id) ON DELETE CASCADE
        )
    `)

    return _db
}

/** Returns all IP entries for a user ordered oldest-first. */
export function getUserIPs(userId) {
    return getDB().query('SELECT * FROM user_ips WHERE user_id = ? ORDER BY created_at ASC').all(userId)
}

/** Returns the DB entry for a specific user+ip combo, or null. */
export function getIPEntry(userId, ip) {
    return getDB().query('SELECT * FROM user_ips WHERE user_id = ? AND ip = ?').get(userId, ip)
}

/** Inserts a new user_ip row and returns its generated id. */
export function addUserIP(userId, ip) {
    const row = getDB().query('INSERT INTO user_ips (user_id, ip) VALUES (?, ?) RETURNING id').get(userId, ip)
    return row.id
}

/** Records the Pangolin rule id for a tracked ip entry + resource. */
export function addIPRule(userIpId, resourceId, ruleId) {
    getDB().run('INSERT INTO ip_rules (user_ip_id, resource_id, rule_id) VALUES (?, ?, ?)', [
        userIpId,
        resourceId,
        String(ruleId),
    ])
}

/** Returns all ip_rules rows for a given user_ip entry. */
export function getIPRules(userIpId) {
    return getDB().query('SELECT * FROM ip_rules WHERE user_ip_id = ?').all(userIpId)
}

/** Deletes a user_ip entry (cascades to ip_rules). */
export function removeUserIP(id) {
    getDB().run('DELETE FROM user_ips WHERE id = ?', [id])
}
