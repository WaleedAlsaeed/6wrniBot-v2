"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: "rule",
    description: "عرض قانون من القوانين",
    onlyInCommandChannel: false,
    options: [
        {
            name: "the-rule",
            description: "القانون",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "member",
            description: "العضو المراد تنبيهه",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: false
        }
    ],
    autocomplete: (interaction, client) => __awaiter(void 0, void 0, void 0, function* () {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            '1-يمنع إستخدام الألفاظ النابية أو البذيئة أو التهجم على الأعضاء',
            '2-يمنع النقاش في الأمور السياسية أو الدينية منعًا باتًا في جميع القنوات',
            '3-يمنع الإرسال المتكرر لنفس الرسالة في غير قناة السبام الإعلانات-spam',
            '4- منافشة أي موضوع لا يمت للقناة بصلة عرضة للإنذار المباشر دون مراجعة',
            '5-يمنع تداول البرامج المقرصنة ( أو ملفات ال Crack ) ، أو الملفات التي تحتوي على فيروسات',
            '6-طرح السؤال أو الإستفسار مباشرة من غير مقدمات (مقدمات مثل: هل يمكنكم مساعدتي؟ )',
            '7-يمنع إرسال أي وسائط تحتوي على صور مخلة بالآداب',
            '8-ينبّه العضو 3 مرات لمخالفته القواعد قبل أن يتم حظره من المجموعة',
            '9-العضو الذي يخرج من السيرفر ثم يدخل مرة أخرى يفقد رتبته ونقاطه (xp)',
            '10-عند مشاركة لعبة او مشروع "يجب" أن يتم مشاركة رابط الVirusTotal مع رابط اللعبة',
            '11-يرجى محاولة الكتابة دائمًا باللغة العربية,ويمنع الكتابة بغير العربية و الإنجليزية',
            '12-يمنع العضو من إستخدامين حسابين نشيطين داخل السيرفر في نفس الوقت',
            '13-أي شخص ينتحل عضوية شخص آخر أو يتهمه بتهم باطله، سيتم حظره مباشرة',
            '14-يمنع إرسال روابط لسيرفرات أخرى للأعضاء على الخاص',
            '15-السؤال والإستفسار والمجادلة لقرارات المشرفين عرضة للحصول على إنذار مباشر',
            '16-يمنع إستخدام أي صورة رمزية خادشة للحياء، كما يمنع إستخدام أسماء مخالفة لذلك',
            '77-حاول أن تحب البطاطا!!',
            '97-يونتي أفضل محرك!'
        ];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        yield interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }),
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const theRule = interaction.options.getString("the-rule", true);
        const member = interaction.options.getUser("member");
        const choices = [
            '1-يمنع إستخدام الألفاظ النابية أو البذيئة أو التهجم على الأعضاء',
            '2-يمنع النقاش في الأمور السياسية أو الدينية منعًا باتًا في جميع القنوات ، أو أي موضوع ليس له علاقة بشكل مباشر بتطوير الألعاب وليس له قناة خاصة، وسيتم التعامل مع اي نقاش سياسي او ديني بالإنذار و العقاب المؤقت ، و الطرد المباشر في المرة الثانية',
            '3-يمنع الإرسال المتكرر لنفس الرسالة في غير قناة السبام الإعلانات-spam',
            '4- منافشة أي موضوع لا يمت للقناة بصلة عرضة للإنذار المباشر دون مراجعة',
            '5-يمنع تداول البرامج المقرصنة ( أو ملفات ال Crack ) ، أو الملفات التي تحتوي على فيروسات',
            '6-طرح السؤال أو الإستفسار مباشرة من غير *مقدمات* (مقدمات مثل: هل يمكنكم مساعدتي؟ )',
            '7-يمنع إرسال أي وسائط تحتوي على صور مخلة بالآداب',
            '8-ينبّه العضو 3 مرات لمخالفته القواعد قبل أن يتم حظره من المجموعة',
            '9-العضو الذي يخرج من السيرفر ثم يدخل مرة أخرى يفقد رتبته ونقاطه (xp)',
            '10-عند مشاركة لعبة او مشروع "يجب" أن يتم مشاركة رابط الVirusTotal مع رابط تحميل اللعبة وإلا سيتم حذف المشاركة',
            '11-يرجى محاولة الكتابة دائمًا باللغة العربية,ويمنع الكتابة بغير العربية و الإنجليزية',
            '12-يمنع العضو من إستخدامين حسابين نشيطين داخل السيرفر في نفس الوقت، وفي حال كان هناك حسابات قديمة يتم ذكرها للمشرفين ليتم حذفها',
            '13-أي شخص ينتحل عضوية شخص آخر أو يتهمه بتهم باطله، سيتم حظره مباشرة',
            '14-يمنع إرسال روابط لسيرفرات أخرى للأعضاء على الخاص، إذا تم التبليغ أكثر من مرة على نفس العضو يعطى إنذار',
            '15-السؤال والإستفسار والمجادلة لقرارات المشرفين عرضة للحصول على إنذار مباشر مثل السؤال عن سبب عقابه عضو آخر',
            '16-يمنع إستخدام أي صورة رمزية خادشة للحياء، كما يمنع إستخدام أسماء مخالفة لذلك، كل إسم أو صورة رمزية مخلة بالآداب أو تدعو للكراهية والعنصرية سيتم تنبيه صاحبها لتعديلها كحد أقصى 24 ساعة، فإذا لم يستجب سنضطر آسفين لحظره',
            '77-حاول أن تحب البطاطا!!',
            '97-يونتي أفضل محرك!'
        ];
        for (const rule of choices) {
            if (rule.includes(theRule)) {
                let msg = theRule;
                if (member) {
                    msg = `*تنبيه ل ${(0, discord_js_1.userMention)(member.id)}*\n` + msg;
                }
                return yield interaction.followUp({ content: msg });
            }
        }
        yield interaction.followUp({ content: "القانون المحدد غير موجود، اختر القانون من الخيارات الموجودة أمامك" });
    }),
});
