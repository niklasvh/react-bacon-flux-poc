/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var Immutable = require('immutable');

var convertSingle = (rawMessage, currentThreadID) => new Immutable.Map({
    id: rawMessage.id,
    threadID: rawMessage.threadID,
    authorName: rawMessage.authorName,
    date: new Date(rawMessage.timestamp),
    text: rawMessage.text,
    isRead: rawMessage.threadID === currentThreadID
});

var convertAll = currentThreadId => rawMessage => convertSingle(rawMessage, currentThreadId);

module.exports = {
    convertRawMessage: convertSingle,
    convertRawMessages: convertAll
};
